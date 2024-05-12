import MenuPlantsItem from './MenuItem';

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
  const handleClickItem = (data: IPlantListItem): void => {
    handlePickSeed(data);
  };

  const renderMenu = (): JSX.Element[] => {
    const list = plantsList.vegetables.map((plant) => {
      return (
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
      );
    });

    return list;
  };

  return <div className="plants-menu">{renderMenu()}</div>;
};

export default PlantsMenu;
