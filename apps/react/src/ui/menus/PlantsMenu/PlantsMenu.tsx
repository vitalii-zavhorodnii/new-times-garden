import MenuPlantsItem from './MenuItem';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IPlantListItem, IPlantsList } from '@models/plants.model';

interface IPlantsMenuProps {
  plantsList: IPlantsList;
  handlePickSeed: (value: IPlantListItem) => void;
  handleModal: (value: boolean) => void;
}

const PlantsMenu = ({
  plantsList,
  handlePickSeed
}: IPlantsMenuProps): JSX.Element => {
  const handleClickItem = (plantsCategories: IPlantListItem): void => {
    handlePickSeed(plantsCategories);
  };

  const renderPagination = (): JSX.Element => {
    return <div></div>;
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
      />
    ));
  };

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {renderMenu()}
    </Swiper>
  );
};

export default PlantsMenu;
