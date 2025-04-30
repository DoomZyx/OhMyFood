
import './_modal-side-base.scss';

const ModalSide = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Empêche la fermeture du modal lorsqu'on clique sur le contenu
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-side-overlay" onClick={onClose}>
      <div className="modal-side-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default ModalSide;