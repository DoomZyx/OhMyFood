import { useEffect, useState } from "react";
import { addToCart } from "../../API/API";
import Modal from "./modal";


export default function Cart({ isOpen, onClose }) {
 const [cart, setCart] = useState(null);

 useEffect(() => {
  if (isOpen) {
   addToCart().then(setCart).catch(console.error)
  }
 }, [isOpen]);



 if (!isOpen) return null;
 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <div className="cart-modal-overlay">
    <h2> Mon panier </h2>
    <div className="layout-cart">
     {cart && cart.items.length > 0 ? (
      <>
      <p><strong>{cart.restaurant.name}</strong></p>
      <ul>
       {cart.items.map(({ item, quantity }) => (
        <li key={item._id}>
         {item.title} <br />
         {item.quantity} <br />
         {item.price}€ <br />
        </li>
       ))}
      </ul>
      </>
     ) : (
      <p> Vous n'avez pas encore commandés</p>
     )}
     <button>Valider</button>
    </div>
   </div>
  </Modal>
 )
}