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

  const {
    imageIDPreviews,
    setImageIDPreviews,
    imageUrlPreviews,
    setImageUrlPreviews,
    imageOwnershipPreviews,
    setImageOwnershipPreviews,
    handleMultiFileChange,
  } = useImageUploader(setFormDataOwner);

  const [currentPreview, setCurrentPreview] = useState(null); // 'identity' | 'restaurant' | 'kbis'

  // Utilitaire pour savoir quelles images afficher dans la modale
  const getPreviewArray = () => {
    if (currentPreview === "identity") return imageIDPreviews;
    if (currentPreview === "restaurants") return imageUrlPreviews;
    if (currentPreview === "kbis") return imageOwnershipPreviews;
    return [];
  };

  const getCurrentPreviewFieldName = () => {
    if (currentPreview === "identity") return "identityDocumentUrl";
    if (currentPreview === "restaurants") return "imageUrl";
    if (currentPreview === "kbis") return "proofOfOwnershipUrl";
    return "";
  };

  const handleRemoveImage = (indexToRemove, field) => {
    const updatePreview = (setFn, previews) => {
      const validArray = Array.isArray(previews) ? previews : [];
      setFn(validArray.filter((_, i) => i !== indexToRemove));
    };

    if (field === "identityDocumentUrl") {
      updatePreview(setImageIDPreviews, imageIDPreviews);
    } else if (field === "imageUrl") {
      updatePreview(setImageUrlPreviews, imageUrlPreviews);
    } else if (field === "proofOfOwnershipUrl") {
      updatePreview(setImageOwnershipPreviews, imageOwnershipPreviews);
    }

    if (typeof setFormDataOwner === "function") {
      setFormDataOwner((prev) => {
        const existing = Array.isArray(prev[field]) ? prev[field] : [];
        return {
          ...prev,
          [field]: existing.filter((_, i) => i !== indexToRemove),
        };
      });
    }
  };
  

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
                  className="prev-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPreview("identity");
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
                <label
                  htmlFor="identityDocumentUrl"
                  className="upload-btn-owner"
                >
                  <i className="fa-solid fa-folder"></i>
                </label>
                <input
                  type="file"
                  id="identityDocumentUrl"
                  accept="image/*"
                  multiple
                  onChange={handleMultiFileChange}
                />
              </div>

              <div className="input-restaurant-photos">
                <p>Photos du restaurant</p>
                <button
                  className="prev-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPreview("restaurants");
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
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

              <div className="input-kbis">
                <p>Joignez votre KBIS</p>
                <button
                  className="prev-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPreview("kbis");
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
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
              <Modal
                isOpen={!!currentPreview}
                onClose={() => setCurrentPreview(null)}
              >
                {getPreviewArray().length > 0 ? (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {getPreviewArray().map((preview, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          className="image-prev"
                          src={preview.url}
                          alt={`preview-${index}`}
                        />
                        <button
                          className="delete-image-uploaded"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveImage(
                              index,
                              getCurrentPreviewFieldName()
                            );
                          }}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Aucune image sélectionnée</p>
                )}
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
