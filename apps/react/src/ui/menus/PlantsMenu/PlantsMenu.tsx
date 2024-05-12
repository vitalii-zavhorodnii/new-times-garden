import MenuPlantsItem from './MenuItem';
import type { IPlantListItem, IPlantsList } from '@models/plants.model';
import { EventBus } from 'src/game/EventBus';

interface IPlantsMenuProps {
  plantsList: IPlantsList;
  handleModal: (value: boolean) => void;
}

const PlantsMenu = ({ plantsList, handleModal }: IPlantsMenuProps): JSX.Element => {
  const handleClickItem = (data: IPlantListItem): void => {
    console.log(data);
    EventBus.emit('pick-plant', data);
    handleModal(false);
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
