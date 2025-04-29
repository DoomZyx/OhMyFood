import { useState, useEffect } from "react";
import "./_registrationForm.scss";
import foodplate2 from "/public/images/foodplate2.webp";

const RegistrationForm = () => {
  const [switchUpForm, setSwitchUpForm] = useState("owner");
  const [errorOwnerRegister, setErrorOwnerRegister] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const [formDataDeliverer, setFormDataDeliverer] = useState({
    Disponibility: "",
    deliveryZone: "",
    IBAN: "",
  });

  const handleChangeOwner = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormDataOwner((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleChangeDeliverer = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormDataDeliverer((prev) => ({
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

  const handleRegisterDeliverer = async (e) => {
    e.preventDefault();

    try {
      const data = await signupDeliverer(formDataDeliverer);
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

  const handleImageChangeowner = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Créer l'aperçu pour afficher l'image uploadé
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagesPreview(previewUrl);

      // Stocker le fichier pour l'envoyer au submit
      setFormDataDeliverer(selectedFile);
    }
  };

  // Suppression des URLs pour éviter les fuites mémoires
  useEffect(() => {
    return () => {
      imagesPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagesPreview]);

  return (
    <>
      <div className="background-owner-register">
        <img src={foodplate2} alt="" />
        <div className="form-container-add">
          <div
            className={`Form owner-register-container ${
              switchUpForm === "owner" ? "true" : "false"
            }`}
          >
            <button
              className="switch-btn deliverer"
              onClick={() => setSwitchUpForm("deliver")}
            >
              Livreur
            </button>
            <div className="form-owner-wrapper">
              <h2 className="owner-title">
                Renseignez les informations de votre restaurant
              </h2>
              <div className="layout-form-owner-register">
                <form className="owner-form" onSubmit={handleRegisterOwner}>
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nom du restaurant"
                    value={formDataOwner.name}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="street"></label>
                  <input
                    type="text"
                    id="street"
                    placeholder="Adresse"
                    value={formDataOwner.street}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="city"></label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Ville"
                    value={formDataOwner.city}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="postalCode"></label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Code postal"
                    value={formDataOwner.postalCode}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="opening"></label>
                  <input
                    type="text"
                    id="opening"
                    placeholder="Vos heures d'ouverture"
                    value={formDataOwner.opening}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="phoneNumber"></label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Numéro du restaurant"
                    value={formDataOwner.phoneNumber}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="deliveryZone"></label>
                  <input
                    type="text"
                    id="deliveryZone"
                    placeholder="Votre rayon de livraison"
                    value={formDataOwner.deliveryZone}
                    onChange={handleChangeOwner}
                  />

                  <label htmlFor="siret"></label>
                  <input
                    type="text"
                    id="siret"
                    placeholder="N°SIRET"
                    value={formDataOwner.siret}
                    onChange={handleChangeOwner}
                  />

                  <div className="checkbox-owner-container">
                    <div className="checkbox-layout">
                      <label htmlFor="dineIn">Sur place</label>
                      <input
                        type="checkbox"
                        checked={formDataOwner.dineIn}
                        onChange={handleChangeOwner}
                        id="dineIn"
                      />
                    </div>

                    <div className="checkbox-layout">
                      <label htmlFor="takeout">A emporter</label>
                      <input
                        type="checkbox"
                        checked={formDataOwner.takeout}
                        onChange={handleChangeOwner}
                        id="takeout"
                      />
                    </div>

                    <div className="checkbox-layout">
                      <label htmlFor="delivery">Livraison</label>
                      <input
                        type="checkbox"
                        checked={formDataOwner.delivery}
                        onChange={handleChangeOwner}
                        id="delivery"
                      />
                    </div>
                  </div>

                  <div className="statut-select">
                    <label htmlFor="legalStatus">Statut juridique</label>
                    <select
                      id="legalStatus"
                      value={formDataOwner.legalStatus}
                      onChange={handleChangeOwner}
                    >
                      <option value="">Choisir un statut</option>
                      <option value="EI">Auto-entrepreneur</option>
                      <option value="SARL">SARL</option>
                      <option value="SAS">SAS</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div className="input-files-layout">
                    <div className="input-identityCard">
                      <p>Votre pièce d'identité</p>
                      <label
                        className="upload-btn-owner"
                        htmlFor="identityDocumentUrl"
                      >
                        <i className="fa-solid fa-folder"></i>
                      </label>
                      <input
                        type="file"
                        name="identityDocumentUrl"
                        id="identityDocumentUrl"
                        accept="image/*"
                        onChange={handleImageChangeowner}
                      />
                      <img src={imagesPreview} alt="" />
                    </div>

                    <div className="input-restaurant-photos">
                      <p>Photos du restaurant</p>
                      <label className="upload-btn-owner" htmlFor="imageUrl">
                        <i className="fa-solid fa-folder"></i>
                      </label>
                      <input
                        type="file"
                        id="imageUrl"
                        accept="image/*"
                        onChange={handleImageChangeowner}
                      />
                      <img src={imagesPreview} alt="" />
                    </div>

                    <div className="input-kbis">
                      <p>Joignez votre KBIS</p>
                      <label
                        className="upload-btn-owner"
                        htmlFor="proofOfOwnershipUrl"
                      >
                        <i className="fa-solid fa-folder"></i>
                      </label>
                      <input
                        type="file"
                        name="proofOfOwnershipUrl"
                        id="proofOfOwnershipUrl"
                        accept="image/*"
                        onChange={handleImageChangeowner}
                      />
                      <img src={imagesPreview} alt="" />
                    </div>
                  </div>

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

          <div
            className={`Form deliverer-register-container ${
              switchUpForm === "deliver" ? "true" : "falsy"
            }`}
          >
            <button
              className="switch-btn"
              onClick={() => setSwitchUpForm("owner")}
            >
              Restaurateur
            </button>
            <div className="form-deliverer-wrapper">
              <h2 className="form-deliverer-title">
                Renseignez vos informations pour devenir livreur
              </h2>
              <div className="layout-form-deliverer">
                <form onSubmit={handleRegisterDeliverer}>
                  <label htmlFor="city"></label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Votre ville de livraison"
                  />

                  <div className="layout-select">
                    <div className="vehicle-select">
                      <label htmlFor="vehicle">Votre type de véhicule</label>
                      <select
                        id="vehicle"
                        value={formDataDeliverer.vehicleType}
                        onChange={handleChangeDeliverer}
                      >
                        <option value="">Choisissez votre véhicule</option>
                        <option value="car">Voiture</option>
                        <option value="bike">Deux-roues</option>
                        <option value="electric">Véhicule électrique</option>
                      </select>
                    </div>

                    <div className="radius-select">
                      <label htmlFor="deliveryRadius">Rayon de livraison</label>
                      <select
                        id="deliveryRadius"
                        value={formDataDeliverer.deliveryRadius}
                        onChange={handleChangeDeliverer}
                      >
                        <option value="">Choisir un rayon</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="15">15 km</option>
                        <option value="20">20 km</option>
                      </select>
                    </div>
                  </div>

                  <label htmlFor="identityDocumentUrl"></label>
                  <input
                    type="file"
                    name="identityDocumentUrl"
                    id="identityDocumentUrl"
                    accept="image/*"
                    onChange={handleChangeDeliverer}
                  />

                  <button className="register-deliverer-btn" type="submit">
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
