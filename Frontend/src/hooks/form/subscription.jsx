import { useState } from "react";
import { signupUser } from "../../API/Account/API";
import { useSwitchContext } from "../../Provider/SwitchForm/switchProvider";

export function useSubscription() {
 const { activeForm, setActiveForm } = useSwitchContext();
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  // Fonction appelée lors de la soumission du formulaire d'inscription
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser({
        email: emailRegister,
        password: passwordRegister,
        firstName,
        lastName: lastName,
        phoneNumber: number,
        address,
        town,
        postalCode,
      });

      console.log("Inscription réussie :", data);
      setActiveForm("connexion");
    } catch (error) {
      if (error.response) {
        setErrorRegister(error.message || "Impossible de contacter le serveur");
      }
    }
  };
  return {
    emailRegister,
    setEmailRegister,
    passwordRegister,
    setPasswordRegister,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    number,
    setNumber,
    address,
    setAddress,
    town,
    setTown,
    postalCode,
    setPostalCode,
    errorRegister,
    handleRegister,
  };
}
