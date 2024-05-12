import { useEffect, useRef, useState } from 'react';

import { EventBus } from './game/EventBus';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

import { useFetchPlantsQuery } from '@services/queries/plants.api';
import { useFetchProductsQuery } from '@services/queries/products.api';
import { useFetchSettingsQuery } from '@services/queries/settings.api';
import { useFetchUserQuery } from '@services/queries/users.api';

import BalanceBar from '@ui/bars/BalanceBar';
import RingButton from '@ui/buttons/RingButton';
import PlantsMenu from '@ui/menus/PlantsMenu';
import ShopMenu from '@ui/menus/ShopMenu';
import PaperModal from '@ui/modals/PaperModal';

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
    if (!!user && !!plants && !!settings) {
      EventBus.emit('initialize-data-fetch', {
        user,
        plants,
        products,
        settings
      });

      setBalanceCoins(user.balanceCoins);
      setBalanceTokens(user.balanceTokens);
      setBalanceXp(user.xp);
      setHidden(false);
    }
  }, [user, plants, products, settings]);

  const currentScene = (scene: Phaser.Scene): void => {
    console.log({ scene });
  };

  const handleShopOpen = (value: boolean): void => {
    setMenuShopOpen(value);
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
      {plants ? (
        <PaperModal
          isOpen={menuPlantsOpen}
          handleModal={handlePlantsModal}
          title="Seeds Shop"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum pariatur omnis animi, et excepturi ipsum ab reprehenderit necessitatibus?"
        >
          <PlantsMenu handleModal={handlePlantsModal} plantsList={plants} />
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
          handleShopOpen={handleShopOpen}
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


// private handleSeedChoose(plant: IPlantListItem) {
//   if (this.user.balanceCoins < plant.gamePrice) {
//     return;
//   }
//   if (this.user.balanceTokens < plant.tokenPrice) {
//     return;
//   }

//   this.pickedPlant = plant;
//   // this.pickedPlantBar.show(this.pickedPlant);

//   this.handleClosePlantsShop();
//   // this.bottomBar.activateCancel();
// }