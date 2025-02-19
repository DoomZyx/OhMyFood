
import './_modal.scss';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Empêche la fermeture du modal lorsqu'on clique sur le contenu
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;