import { useState } from "react";

const OwnerRegister = () => {
  const [errorOwnerRegister, setErrorOwnerRegister] = useState("");

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await signupOwner(formData);
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
    <>
      <div className="background-owner-register">
        <img src={""} alt="" />
        <div className="owner-register-container">
          <div className="layout-form-owner-register">
            <form onSubmit={handleRegister}>
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="street"></label>
              <input
                type="text"
                id="street"
                value={formData.street}
                onChange={handleChange}
              />

              <label htmlFor="city"></label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
              />

              <label htmlFor="postalCode"></label>
              <input
                type="text"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

              <label htmlFor="imageUrl"></label>
              <input
                type="file"
                id="imageUrl"
                accept="image/*"
                onChange={handleChange}
              />

              <label htmlFor="opening"></label>
              <input
                type="text"
                id="opening"
                value={formData.opening}
                onChange={handleChange}
              />

              <label htmlFor="phoneNumber"></label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <label htmlFor="deliveryZone"></label>
              <input
                type="text"
                id="deliveryZone"
                value={formData.deliveryZone}
                onChange={handleChange}
              />

              <label htmlFor="statut"></label>
              <input
                type="text"
                id="statut"
                value={formData.statut}
                onChange={handleChange}
              />

              <label htmlFor="siret"></label>
              <input
                type="text"
                id="siret"
                value={formData.siret}
                onChange={handleChange}
              />

              <label htmlFor="dineIn"></label>
              <input
                type="checkbox"
                checked={formData.dineIn}
                onChange={handleChange}
                id="dineIn"
              />

              <label htmlFor="takeout"></label>
              <input
                type="checkbox"
                checked={formData.takeout}
                onChange={handleChange}
                id="takeout"
              />

              <label htmlFor="delivery"></label>
              <input
                type="checkbox"
                checked={formData.delivery}
                onChange={handleChange}
                id="delivery"
              />

              <label htmlFor="identityDocumentUrl"></label>
              <input
                type="file"
                name="identityDocumentUrl"
                id="identityDocumentUrl"
                accept="image/*"
                onChange={handleChange}
              />

              <label htmlFor="proofOfOwnershipUrl"></label>
              <input
                type="file"
                name="proofOfOwnershipUrl"
                id="proofOfOwnershipUrl"
                accept="image/*"
                onChange={handleChange}
              />

              <button type="submit" className="register-owner-btn">
                Envoyer
              </button>
            </form>
            {errorOwnerRegister && (
              <p style={{ color: "red" }}>{errorOwnerRegister}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerRegister;
