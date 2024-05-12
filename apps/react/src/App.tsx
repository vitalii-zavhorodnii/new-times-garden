import { useEffect, useRef, useState } from 'react';

import { DateTime } from 'luxon';

import { EventBus } from '@game/EventBus';
import { IRefPhaserGame, PhaserGame } from '@game/PhaserGame';

import { useFetchPlantsQuery } from '@services/queries/plants.api';
import { useFetchProductsQuery } from '@services/queries/products.api';
import { useFetchSettingsQuery } from '@services/queries/settings.api';
import {
  useFetchUserQuery,
  useHarvestMutation,
  useStartGrowMutation
} from '@services/queries/users.api';

import BalanceBar from '@ui/bars/BalanceBar';
import PickedPlantBar from '@ui/bars/PickedPlantBar';
import RingButton from '@ui/buttons/RingButton';
import PlantsMenu from '@ui/menus/PlantsMenu';
import ShopMenu from '@ui/menus/ShopMenu';
import PaperModal from '@ui/modals/PaperModal';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

const WebApp = window?.Telegram?.WebApp;

if (WebApp) {
  WebApp.expand();
  WebApp.disableClosingConfirmation();
  WebApp.ready();
} else {
  console.log('No Web App!');
}

export default function App(): JSX.Element {
  const [isHiddenUI, setHidden] = useState(true);
  const [pickedPlant, setPickedPlant] = useState<IPlantListItem | null>(null);
  const [menuPlantsOpen, setMenuPlantsOpen] = useState(false);
  const [menuShopOpen, setMenuShopOpen] = useState(false);
  const [isEscapeActive, setEscapeActive] = useState(false);

  const [balanceCoins, setBalanceCoins] = useState(0);
  const [balanceTokens, setBalanceTokens] = useState(0);
  const [balanceXp, setBalanceXp] = useState(0);

  const { data: user } = useFetchUserQuery('410027537');
  const { data: plants } = useFetchPlantsQuery();
  const { data: products } = useFetchProductsQuery();
  const { data: settings } = useFetchSettingsQuery();

  const [startGrow] = useStartGrowMutation();
  const [harvestQuery] = useHarvestMutation();

  const phaserRef = useRef<IRefPhaserGame | null>(null);

  useEffect(() => {
    if (!!user && !!settings) {
      setBalanceCoins(user.balanceCoins);
      setBalanceTokens(user.balanceTokens);
      setBalanceXp(user.xp);

      EventBus.emit('initialize-data-fetch', {
        user,
        settings
      });
    }
  }, [user, settings]);

  useEffect(() => {
    EventBus.emit('change-balance', { balanceCoins, balanceTokens, balanceXp });
  }, [balanceCoins, balanceTokens, balanceXp]);

  const currentScene = (scene: Phaser.Scene): void => {
    setHidden(false);

    EventBus.on(
      'withdraw-balance',
      ({ coins, tokens }: { coins: number; tokens: number }) => {
        setBalanceCoins((prevState) => prevState - coins);
        setBalanceTokens((prevState) => prevState - tokens);
      }
    );

    EventBus.on('clear-pick-plant', () => {
      setPickedPlant(null);
      setEscapeActive(false);
    });

    EventBus.on('plant-new-plant', (data: any) => {
      console.log('plant-new-plant', data);
      if (user) {
        startGrow({
          userId: user?.telegramId,
          plantId: data.id,
          rowIndex: data.rowIndex,
          plantIndex: data.plantIndex,
          plantedAtClient: DateTime.now().toMillis()
        });
      }
    });

    EventBus.on(
      'harvest',
      (data: { plant: IPlantListItem; rowIndex: number; plantIndex: number }) => {
        const { coinsIncome, tokensIncome, xpIncome } = data.plant;

        setBalanceCoins((balance) => balance + coinsIncome);
        setBalanceTokens((balance) => balance + tokensIncome);
        setBalanceXp((balance) => balance + xpIncome);

        if (user) {
          harvestQuery({
            userId: user.telegramId,
            rowIndex: data.rowIndex,
            plantIndex: data.plantIndex
          });
        }
      }
    );
  };

  const handlePickSeed = (seed: IPlantListItem): void => {
    setMenuPlantsOpen(false);
    setPickedPlant(seed);
    setEscapeActive(true);
    EventBus.emit('unblock-game');
    EventBus.emit('pick-plant', seed);
  };

  const handlePlantsModal = (value: boolean): void => {
    if (value) {
      EventBus.emit('block-game');
    } else {
      EventBus.emit('unblock-game');
    }

    setMenuPlantsOpen(value);
  };

  const handleShopModal = (value: boolean): void => {
    if (!value) {
      EventBus.emit('block-game');
    } else {
      EventBus.emit('unblock-game');
    }

    setMenuShopOpen(value);
  };

  const handleEscape = (): void => {
    setMenuPlantsOpen(false);
    setMenuShopOpen(false);
    setEscapeActive(false);

    EventBus.emit('clear-pick-plant');
  };

  return (
    <>
      <PickedPlantBar seed={pickedPlant} />

      {plants ? (
        <PaperModal
          isOpen={menuPlantsOpen}
          handleModal={handlePlantsModal}
          title="Seeds Shop"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum pariatur omnis animi, et excepturi ipsum ab reprehenderit necessitatibus?"
        >
          <PlantsMenu
            handlePickSeed={handlePickSeed}
            handleModal={handlePlantsModal}
            plantsList={plants}
            balanceCoins={balanceCoins}
            balanceTokens={balanceTokens}
          />
        </PaperModal>
      ) : null}

      {products ? (
        <PaperModal
          isOpen={menuShopOpen}
          handleModal={handleShopModal}
          title="Seeds Shop"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum pariatur omnis animi, et excepturi ipsum ab reprehenderit necessitatibus?"
        >
          <ShopMenu handleModal={handleShopModal} productsList={products} />
        </PaperModal>
      ) : null}

      {user ? (
        <BalanceBar
          isHidden={isHiddenUI}
          coins={balanceCoins}
          tokens={balanceTokens}
          xp={balanceXp}
          handleShopOpen={handleShopModal}
        />
      ) : null}

      {
        <RingButton
          handleMenu={handlePlantsModal}
          handleEscape={handleEscape}
          isEscapeActive={isEscapeActive}
          isHidden={isHiddenUI}
        />
      }

      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    </>
  );
}
