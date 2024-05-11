import { useState } from 'react';

interface IPaperModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PaperModal = ({ title, description, children }: IPaperModalProps) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className={`papper-menu ${isOpen ? '' : 'hidden'}`}>
      <div className="papper-menu__foreground">
        <img
          onClick={() => setOpen(false)}
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
