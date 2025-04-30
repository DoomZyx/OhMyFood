import "./_notification-modal-base.scss"

const NotificationModal = ({ children, isOpen, onClose }) => {
 if (!isOpen) return null;

 const blockClosingModal = (e) => {
  e.stopPropagation()
 };

 return (
  <div className="authenticated-modal-overlay" onClick={onClose}>
   <div className="authenticated-modal-content" onClick={blockClosingModal}>
    {children}
   </div>
  </div>
 )
}

export default NotificationModal;