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
      await createRestaurant(formDataOwner);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorOwnerRegister(
        error.message || "Impossible de créer le restaurant"
      );
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