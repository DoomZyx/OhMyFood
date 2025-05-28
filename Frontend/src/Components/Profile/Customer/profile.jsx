import { useState } from "react";
import "./_profile.scss";
import foodplate1 from "/public/images/foodplate1.webp";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "../../../../node_modules/react-redux/dist/react-redux";
import { updateUserProfile } from "../../../Store/FetchDataAPI/GetDataUser/ThunkAPI";
import { fetchUserProfile } from "../../../Store/FetchDataAPI/GetDataUser/ThunkAPI";

function UserInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [previewImage, setPreviewImage] = useState(null);

  // Appel du profil utilisateur si authentifié mais pas encore chargé
  useEffect(() => {
    if (isAuthenticated && (!user || user.id === "")) {
      dispatch(fetchUserProfile(sessionStorage.getItem("token")));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  // Contrôle la visibilité des inputs
  const [visibleInputs, setVisibleInputs] = useState({
    showNom: false,
    showPrenom: false,
    showPhone: false,
    showImage: false,
    showAddress: false,
    showTown: false,
    showPostalCode: false,
  });

  // Affiche ou cache dynamiquement un input
  const toggleInput = (field) => {
    setVisibleInputs((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Stocke les valeurs modifiables des inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avatar: "",
    address: "",
    town: "",
    postalCode: "",
  });

  console.log(formData);

  // Remplit formData avec les valeurs de l'utilisateur (à l’arrivée des données)
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        avatar: user.profilePicture || "",
        address: user.address || "",
        town: user.town || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  // Met à jour la valeur d’un input dans formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (field) => {
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("address", formData.address);
    form.append("town", formData.town);
    form.append("postalCode", formData.postalCode);

    if (formData.avatar) {
      form.append("avatar", formData.avatar);
    }

    dispatch(updateUserProfile(form)).then(() => {
      // Cache l’input concerné
      setVisibleInputs((prev) => ({
        ...prev,
        [field]: false,
      }));
    });
  };

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="background-profile">
      <img src={foodplate1} alt="foodplate" />

      <div className="profile-container">
        <div className="layout-user-profile">
          {isAuthenticated && user && (
            <>
              {!visibleInputs.showImage ? (
                user.profilePicture ? (
                  <>
                    <img
                      src={`http://localhost:3000${user.profilePicture}`}
                      alt="Photo de profil"
                      className="profile-img"
                    />
                    <button
                      className="modify-userImage"
                      onClick={() => toggleInput("showImage")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <>
                    <div className="layout-nopic">
                      <div className="user-circle">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <button
                        className="modify-userImage"
                        onClick={() => toggleInput("showImage")}
                      >
                        Modifier
                      </button>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="input-upload-photo">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Photo de profil"
                        className="profile-img"
                      />
                    ) : (
                      <div className="layout-nopic">
                        <div className="user-circle">
                          <i className="fa-solid fa-user"></i>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="layout-btn-image-profile">
                    <label htmlFor="avatar-upload" className="upload-btn">
                      <i className="fa-solid fa-folder"></i>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData((prev) => ({
                            ...prev,
                            avatar: file,
                          }));

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPreviewImage(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button
                      className="cancel-pic"
                      onClick={() => {
                        toggleInput("showImage");
                        setPreviewImage(null);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showImage")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                </>
              )}

              <div className="profile-name">
                {!visibleInputs.showPrenom ? (
                  <>
                    <h4>{user.firstName}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showPrenom")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-firstname">
                    <label htmlFor="firstName"></label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showPrenom")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showPrenom")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-surname">
                {!visibleInputs.showNom ? (
                  <>
                    <h4>{user.lastName}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showNom")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-lastname">
                    <label htmlFor="lastName"></label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showNom")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showNom")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-phoneNumber">
                {!visibleInputs.showPhone ? (
                  <>
                    <h4>{user.phoneNumber}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showPhone")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-phone">
                    <label htmlFor="phoneNumber"></label>
                    <input
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showPhone")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showPhone")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-phoneNumber">
                {!visibleInputs.showAddress ? (
                  <>
                    <h4>{user.address}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showAddress")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-address">
                    <label htmlFor="address"></label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showAddress")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showTown")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-town">
                {!visibleInputs.showTown ? (
                  <>
                    <h4>{user.town}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showTown")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-town">
                    <label htmlFor="town"></label>
                    <input
                      id="town"
                      type="text"
                      name="town"
                      value={formData.town}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showTown")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showTown")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-postalCode">
                {!visibleInputs.showPostalCode ? (
                  <>
                    <h4>{user.postalCode}</h4>
                    <button
                      className="modify-userdata"
                      onClick={() => toggleInput("showPostalCode")}
                    >
                      Modifier
                    </button>
                  </>
                ) : (
                  <div className="input-change-postalCode">
                    <label htmlFor="postalCode"></label>
                    <input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                    <button
                      className="cancel-modif"
                      onClick={() => toggleInput("showPostalCode")}
                    >
                      Annuler
                    </button>
                    <button
                      className="save-modif"
                      onClick={() => handleSave("showPostalCode")}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;