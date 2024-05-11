import { useEffect, useRef, useState } from 'react';

import { EventBus } from './game/EventBus';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

import { useFetchPlantsQuery } from '@services/queries/plants.api';
import { useFetchProductsQuery } from '@services/queries/products.api';
import { useFetchSettingsQuery } from '@services/queries/settings.api';
import { useFetchUserQuery } from '@services/queries/users.api';

import BalanceBar from '@ui/bars/BalanceBar';
import PlantsMenu from '@ui/menus/PlantsMenu';
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
    }
  }, [user, plants, products, settings]);

  const currentScene = (scene: Phaser.Scene) => {
    console.log({ scene });
  };

  return (
    <>
      {plants ? (
        <PaperModal
          title="Seeds Shop"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum pariatur omnis animi, et excepturi ipsum ab reprehenderit necessitatibus? Repellat unde perspiciatis velit eligendi officiis suscipit rerum id doloribus dolores. Dignissimos."
        >
          <PlantsMenu plantsList={plants} />
        </PaperModal>
      ) : null}

      <BalanceBar />
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    </>
  );
}
