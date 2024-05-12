interface IRingButtonProps {
  handleMenu: (value: boolean) => void;
  handleEscape: React.MouseEventHandler<HTMLDivElement>;
  isEscapeActive: boolean;
  isHidden: boolean;
}

const RingButton = ({
  isHidden,
  handleMenu,
  handleEscape,
  isEscapeActive
}: IRingButtonProps): JSX.Element => {
  return (
    <div
      className={`bottom-menu ${isHidden ? 'hidden' : ''} ${
        isEscapeActive ? 'rotated' : ''
      }`}
    >
      <div className="circle">
        <div className="circle__background">
          <img className="circle__image" src="./assets/menu/ring.png" alt="ring" />
        </div>

        <div className="circle__button-container">
          <div onClick={() => handleMenu(true)} className="circle__button">
            <img
              className="circle__icon"
              src="./assets/menu/plant-shop.png"
              alt="plants"
            />
          </div>
        </div>

        <div className="circle__button-container rotated">
          <div onClick={handleEscape} className="circle__button">
            <img
              className="circle__icon"
              src="./assets/menu/cancel.png"
              alt="escape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingButton;
