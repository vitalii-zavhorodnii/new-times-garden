import { timeReadableConverter } from '@helpers/time-coverter';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

interface IPickedPlantBarProps {
  seed: IPlantListItem | null;
}

const PickedPlantBar = ({ seed }: IPickedPlantBarProps): JSX.Element => {
  const renderBar = () => {
    if (!seed) return null;

    const growingString = timeReadableConverter(seed.growTime);

    return (
      <div className={`picked-plant ${seed ? '' : 'hidden'}`}>
        <img className="picked-plant-bar__preview" src={seed.icon} alt="icon" />
        <div className="picked-plant-bar__stats">
          {seed.gamePrice ? (
            <p className="picked-plant-bar__value">
              <img
                className="picked-plant-bar__icon"
                src="./assets/utils/coin.png"
                alt="coin"
              />
              ${seed.gamePrice}
            </p>
          ) : null}
          {seed.tokenPrice ? (
            <p className="picked-plant-bar__value">
              <img
                className="picked-plant-bar__icon"
                src="./assets/utils/token.svg"
                alt="token"
              />
              {seed.tokenPrice}
            </p>
          ) : null}
          <p className="picked-plant-bar__value">
            <img
              className="picked-plant-bar__icon"
              src="./assets/utils/timer.png"
              alt="timer"
            />
            {growingString}
          </p>
        </div>
      </div>
    );
  };

  return <>{renderBar()}</>;
};

export default PickedPlantBar;
