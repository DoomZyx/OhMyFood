import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSiretValidator } from "../../hooks/SiretValidator/siretValidator";
import { createRestaurant } from "../../API/Restaurants/API";

export function useOwnerForm() {
  const navigate = useNavigate();
  const [errorOwnerRegister, setErrorOwnerRegister] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    identityDocumentUrl: "",
    proofOfOwnershipUrl: "",
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

    const formData = new FormData();

    // Injection des champs simples (texte, booléens, etc.)
    for (const key in formDataOwner) {
      const value = formDataOwner[key];

      // Si c’est un champ fichier → on traite à part
      if (
        key === "identityDocumentUrl" ||
        key === "proofOfOwnershipUrl" ||
        key === "imageUrl"
      ) {
        if (Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append(key, file);
            }
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        }
      } else {
        // Pour les valeurs booléennes, on les force en string (sinon côté back ce sera "undefined")
        const normalizedValue =
          typeof value === "boolean" ? String(value) : value;
        formData.append(key, normalizedValue);
      }
    }

    try {

      await createRestaurant(formData);

      // Succès
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erreur lors de la création du restaurant :", error);
      setErrorOwnerRegister(error.message || "Erreur inconnue");
    }
  };
  

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const { siretStatus, siretMessage, validateSiret } = useSiretValidator();

  return {
    errorOwnerRegister,
    setErrorOwnerRegister,
    formDataOwner,
    setFormDataOwner,
    handleChangeOwner,
    handleRegisterOwner,
    siretStatus,
    siretMessage,
    validateSiret,
    showSuccessModal,
    handleCloseModal
  };
}