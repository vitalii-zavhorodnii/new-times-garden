import { useEffect, useRef, useState } from 'react';

import { EventBus } from '@game/EventBus';
import { IRefPhaserGame, PhaserGame } from '@game/PhaserGame';

import { useFetchPlantsQuery } from '@services/queries/plants.api';
import { useFetchProductsQuery } from '@services/queries/products.api';
import { useFetchSettingsQuery } from '@services/queries/settings.api';
import { useFetchUserQuery } from '@services/queries/users.api';

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

  const phaserRef = useRef<IRefPhaserGame | null>(null);

  useEffect(() => {
    if (!!user && !!settings) {
      EventBus.emit('initialize-data-fetch', {
        user,
        settings
      });

      EventBus.on('loading-end', () => {
        setBalanceCoins(user.balanceCoins);
        setBalanceTokens(user.balanceTokens);
        setBalanceXp(user.xp);
        setHidden(false);
      });

      EventBus.on('clear-pick-plant', () => {
        console.log('clear-pick-plant', null);
        setPickedPlant(null);
      });

      EventBus.on('plant-new-plant', (data: any) => {
        console.log('plant-new-plant', data);
      });

      EventBus.on(
        'withdraw-balance',
        ({ coins, tokens }: { coins: number; tokens: number }) => {
          console.log('withdraw-balance');
          setBalanceCoins(balanceCoins - coins);
          setBalanceTokens(balanceTokens - tokens);
        }
      );
    }
  }, [user, plants, products, settings]);

  useEffect(() => {
    EventBus.emit('change-balance', { balanceCoins, balanceTokens, balanceXp });
  }, [balanceCoins, balanceTokens, balanceXp]);

  const currentScene = (scene: Phaser.Scene): void => {
    console.log({ scene });
  };

  const handleClearSeed = () => {
    setPickedPlant(null);
  };

  const handlePickSeed = (seed: IPlantListItem): void => {
    setMenuPlantsOpen(false);
    setPickedPlant(seed);
    EventBus.emit('pick-plant', seed);
  };

  const handlePlantsModal = (value: boolean): void => {
    setMenuPlantsOpen(value);
  };

  const handleShopModal = (value: boolean): void => {
    setMenuShopOpen(value);
  };

  const handleEscape = (): void => {
    setMenuPlantsOpen(false);
    setMenuShopOpen(false);
    setEscapeActive(false);
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
