import { useDelivererRegister } from "../../../hooks/form/DelivererRegister";
import VehicleType from "../../../Components/Buttons/Select/VehicleType";
import DeliveryRadius from "../../../Components/Buttons/Select/DeliveryRadius";
import { useImageUploader } from "../../../hooks/ImagesUploader/imagesUploader";

function DelivererRegistration() {
  const { imagePreviews, handleFileChange } = useImageUploader();
  const { handleRegisterDeliverer } = useDelivererRegister;

  return (
    <>
      <div className="form-deliverer-wrapper">
        <div className="h2Wrapper">
          <h2 className="form-deliverer-title">
            RENSEIGNEZ VOS INFORMATIONS POUR DEVENIR LIVREUR
          </h2>
        </div>
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
                <VehicleType />
              </div>

              <div className="radius-select">
                <DeliveryRadius />
              </div>
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
                  onChange={handleFileChange}
                />
                <img src={imagePreviews} alt="" style={{ display: "none" }} />
              </div>
            </div>

            <button className="register-deliverer-btn" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DelivererRegistration;
