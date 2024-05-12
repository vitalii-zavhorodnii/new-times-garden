import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import MenuPlantsItem from './MenuItem';
import PlantsPagination from './PlantsPagination';

import type { IPlantListItem, IPlantsList } from '@models/plants.model';

interface IPlantsMenuProps {
  balanceCoins: number;
  balanceTokens: number;
  plantsList: IPlantsList;
  handlePickSeed: (value: IPlantListItem) => void;
  handleModal: (value: boolean) => void;
}

const PlantsMenu = ({
  plantsList,
  handlePickSeed,
  balanceCoins,
  balanceTokens
}: IPlantsMenuProps): JSX.Element => {
  const handleClickItem = (seed: IPlantListItem): void => {
    if (balanceCoins < seed.gamePrice) return;
    if (balanceTokens < seed.tokenPrice) return;
    
    handlePickSeed(seed);
  };

  const renderMenu = (): JSX.Element[] => {
    const markup = [];

    for (const category in plantsList) {
      if (plantsList[category].length) {
        markup.push(
          <SwiperSlide key={category} style={{ height: '100%' }}>
            <ul className="">{renderList(plantsList[category])}</ul>
          </SwiperSlide>
        );
      }
    }

    return markup;
  };

  const renderList = (category: IPlantListItem[]): JSX.Element[] => {
    return category.map((plant) => (
      <MenuPlantsItem
        key={plant._id}
        onClick={() => handleClickItem(plant)}
        title={plant.title}
        timer={1}
        coins={plant.gamePrice}
        tokens={plant.tokenPrice}
        coinsIncome={plant.coinsIncome}
        tokensIncome={plant.tokensIncome}
        xpIncome={plant.xpIncome}
        icon={plant.title}
        balanceCoins={balanceCoins}
        balanceTokens={balanceTokens}
      />
    ));
  };

  const formPagination = (): string[] => {
    const categoriesButtons = [];

    for (const category in plantsList) {
      if (plantsList[category].length) {
        categoriesButtons.push(category);
      }
    }
    return categoriesButtons;
  };

  return (
    <>
      <Swiper
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
      >
        <PlantsPagination pages={formPagination()} />
        {renderMenu()}
      </Swiper>
    </>
  );
};

export default PlantsMenu;
