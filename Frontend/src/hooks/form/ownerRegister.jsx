import { useState } from "react";

export function useOwnerForm() {
 const [errorOwnerRegister, setErrorOwnerRegister] = useState("");
  const [formDataOwner, setFormDataOwner] = useState({
     name: "",
     street: "",
     city: "",
     postalCode: "",
     imageUrl: "",
     opening: "",
     phoneNumber: "",
     dineIn: false,
     takeout: false,
     delivery: false,
     deliveryZone: "",
     statut: "",
     siret: "",
     identityDocumentUrl: null,
     proofOfOwnershipUrl: null,
   });

   const handleChangeOwner = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormDataOwner((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleRegisterOwner = async (e) => {
   e.preventDefault();

   try {
     const data = await signupOwner(formDataOwner);
     console.log("Inscription réussi :", data);
     // navigate()
   } catch (error) {
     if (error.response) {
       setErrorOwnerRegister(
         error.message || "Impossible de se connecter au serveur"
       );
     }
   }
 };


 return (
    errorOwnerRegister,
    setErrorOwnerRegister,
    formDataOwner,
    setFormDataOwner,
    handleChangeOwner,
    handleRegisterOwner
 );
}