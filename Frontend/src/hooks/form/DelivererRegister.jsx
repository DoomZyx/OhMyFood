import { useState } from "react";

export function useDelivererRegister() {
  const [formDataDeliverer, setFormDataDeliverer] = useState({
    Disponibility: "",
    deliveryZone: "",
    IBAN: "",
  });
  const [error, setError] = useState("");

  const handleChangeDeliverer = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormDataDeliverer((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleRegisterDeliverer = async (e) => {
    e.preventDefault();

    try {
      const data = await signupDeliverer(formDataDeliverer);
      console.log("Inscription réussi :", data);
      // navigate()
    } catch (error) {
      if (error.response) {
        setError(error.message || "Impossible de se connecter au serveur");
      }
    }
  };
  return (
    error,
    setError,
    formDataDeliverer,
    setFormDataDeliverer,
    handleChangeDeliverer,
    handleRegisterDeliverer
  );
}
