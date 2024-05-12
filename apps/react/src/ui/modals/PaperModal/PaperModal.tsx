interface IPaperModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  handleModal: (value: boolean) => void;
  children: React.ReactNode;
}

const PaperModal = ({
  isOpen,
  handleModal,
  title,
  description,
  children
}: IPaperModalProps): JSX.Element => {
  return (
    <div className={`papper-menu ${isOpen ? '' : 'hidden'}`}>
      <div className="papper-menu__foreground">
        <img
          onClick={() => handleModal(false)}
          className="papper-menu__close-btn"
          src="./assets/utils/cross.png"
          alt="close"
        />
        <img
          className="papper-menu__frame"
          src="./assets/utils/frame.png"
          alt="frame"
        />
      </div>

      <div className="papper-menu__container">
        <h4 className="papper-menu__header">{title}</h4>
        <p className="papper-menu__description">{description}</p>
        <div className="papper-menu__content">{children}</div>
      </div>
    </div>
  );
};

export default PaperModal;
