import { useOwnerForm } from "../../../hooks/form/ownerRegister";
import LegalStatus from "../../../Components/Buttons/Select/LegalStatus";
import { useImageUploader } from "../../../hooks/ImagesUploader/imagesUploader";
import Modal from "../../../Components/Modal/Basic/basicModal";
import { useState } from "react";

export function OwnerRegistration() {
  const {
    formDataOwner,
    setFormDataOwner,
    errorOwnerRegister,
    handleChangeOwner,
    handleRegisterOwner,
  } = useOwnerForm();

  const { imagePreviews, handleMultiFileChange, handleSingleFileChange } =
    useImageUploader(setFormDataOwner);
  const [isModal, setModal] = useState(false);

  return (
    <>
      <div className="form-owner-wrapper">
        <div className="h2Wrapper">
          <h2 className="owner-title">
            RENSEIGNEZ LES INFORMATIONS DE VOTRE RESTAURANT
          </h2>
        </div>
        <div className="layout-form-owner-register">
          <form className="owner-form" onSubmit={handleRegisterOwner}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              placeholder="Nom du restaurant"
              value={formDataOwner?.name}
              onChange={handleChangeOwner}
            />

            <label htmlFor="street"></label>
            <input
              type="text"
              id="street"
              placeholder="Adresse"
              value={formDataOwner?.street}
              onChange={handleChangeOwner}
            />

            <label htmlFor="city"></label>
            <input
              type="text"
              id="city"
              placeholder="Ville"
              value={formDataOwner?.city}
              onChange={handleChangeOwner}
            />

            <label htmlFor="postalCode"></label>
            <input
              type="text"
              id="postalCode"
              placeholder="Code postal"
              value={formDataOwner?.postalCode}
              onChange={handleChangeOwner}
            />

            <label htmlFor="opening"></label>
            <input
              type="text"
              id="opening"
              placeholder="Vos heures d'ouverture"
              value={formDataOwner?.opening}
              onChange={handleChangeOwner}
            />

            <label htmlFor="phoneNumber"></label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Numéro du restaurant"
              value={formDataOwner?.phoneNumber}
              onChange={handleChangeOwner}
            />

            <label htmlFor="deliveryZone"></label>
            <input
              type="text"
              id="deliveryZone"
              placeholder="Votre rayon de livraison"
              value={formDataOwner?.deliveryZone}
              onChange={handleChangeOwner}
            />

            <label htmlFor="siret"></label>
            <input
              type="text"
              id="siret"
              placeholder="N°SIRET"
              value={formDataOwner?.siret}
              onChange={handleChangeOwner}
            />

            <div className="statut-select">
              <LegalStatus />
            </div>

            <div className="checkbox-owner-container">
              <div className="checkbox-layout">
                <label htmlFor="dineIn">Sur place</label>
                <input
                  type="checkbox"
                  checked={formDataOwner?.dineIn}
                  onChange={handleChangeOwner}
                  id="dineIn"
                />
              </div>

              <div className="checkbox-layout">
                <label htmlFor="takeout">A emporter</label>
                <input
                  type="checkbox"
                  checked={formDataOwner?.takeout}
                  onChange={handleChangeOwner}
                  id="takeout"
                />
              </div>

              <div className="checkbox-layout">
                <label htmlFor="delivery">Livraison</label>
                <input
                  type="checkbox"
                  checked={formDataOwner?.delivery}
                  onChange={handleChangeOwner}
                  id="delivery"
                />
              </div>
            </div>

            <div className="input-files-layout">
              <div className="input-identityCard">
                <p>Votre pièce d'identité</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}
                >
                  Aperçu
                </button>
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
                  onChange={handleMultiFileChange}
                  multiple
                />
              </div>

              <Modal isOpen={isModal} onClose={() => setModal(false)}>
                {Array.isArray(imagePreviews.identityDocumentUrl) &&
                  imagePreviews.identityDocumentUrl.map((preview, index) => (
                    <img
                      key={index}
                      src={preview.url}
                      alt={`preview-${index}`}
                      style={{
                        width: "250px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
              </Modal>

              <div className="input-restaurant-photos">
                <p>Photos du restaurant</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}
                >
                  Aperçu
                </button>
                <label className="upload-btn-owner" htmlFor="imageUrl">
                  <i className="fa-solid fa-folder"></i>
                </label>
                <input
                  type="file"
                  id="imageUrl"
                  accept="image/*"
                  onChange={handleMultiFileChange}
                />
              </div>

              <Modal isOpen={isModal} onClose={() => setModal(false)}>
                {Array.isArray(imagePreviews.imageUrl) &&
                  imagePreviews.imageUrl.map((preview, index) => (
                    <img
                      key={index}
                      src={preview.url}
                      alt={`preview-${index}`}
                      style={{
                        width: "250px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
              </Modal>

              <div className="input-kbis">
                <p>Joignez votre KBIS</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}
                >
                  Aperçu
                </button>
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
                  onChange={handleMultiFileChange}
                />
              </div>
              <Modal isOpen={isModal} onClose={() => setModal(false)}>
                {Array.isArray(imagePreviews.proofOfOwnershipUrl) &&
                  imagePreviews.proofOfOwnershipUrl.map((preview, index) => (
                    <img
                      key={index}
                      src={preview.url}
                      alt={`preview-${index}`}
                      style={{
                        width: "250px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
              </Modal>
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
    </>
  );
}

export default OwnerRegistration;
