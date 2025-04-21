import { useState } from "react";
import "./_profile.scss";
import foodplate1 from "../../../public/images/foodplate1.webp";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "../../../node_modules/react-redux/dist/react-redux";
import { fetchUserProfile } from "../../Store/FetchDataAPI/GetDataUser/ThunkAPI";

function UserInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("👤 USER DU STORE:", user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Appel du profil utilisateur si authentifié mais pas encore chargé
  useEffect(() => {
    if (isAuthenticated && (!user || user.id === "")) {
      console.log("📡 fetchUserProfile lancé");
      dispatch(fetchUserProfile(sessionStorage.getItem("token")));
    }
  }, [dispatch, isAuthenticated, user?.id]);


  // Contrôle la visibilité des inputs
  const [visibleInputs, setVisibleInputs] = useState({
    showNom: false,
    showPrenom: false,
    showPhone: false,
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
  });

  // Remplit formData avec les valeurs de l'utilisateur (à l’arrivée des données)
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
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

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="background-profile">
      <img src={foodplate1} alt="foodplate" />

      <div className="profile-container">
        <div className="layout-user-profile">

          <div className="user-circle">
            <i className="fa-solid fa-user"></i>
          </div>
          {isAuthenticated && user && (
            <>
              <div className="profile-name">
                <h3>{user.firstName}</h3>
                <button onClick={() => toggleInput("showPrenom")}>
                  Modifier
                </button>
              </div>
              {visibleInputs.showPrenom && (
                <div className="input-change-surname">
                  <input
                    type="text"
                    name="prenom"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <button
                    className="cancel-modif"
                    onClick={() => toggleInput("showPrenom")}
                  >
                    Annuler
                  </button>
                  <button className="save-name">Sauvegarder</button>
                </div>
              )}

              <div className="profile-surname">
                <h3>{user.lastName}</h3>
                <button onClick={() => toggleInput("showNom")}>Modifier</button>
              </div>

              {visibleInputs.showNom && (
                <div className="input-change-surname">
                  <input
                    type="text"
                    name="nom"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <button className="save-name">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
              )}

              <div className="profile-phoneNumber">
                <h3>{user.phoneNumber}</h3>
                <button onClick={() => toggleInput("showPhone")}>
                  Modifier
                </button>
              </div>

              {visibleInputs.showPhone && (
                <div className="input-change-phone">
                  <input
                    type="number"
                    name="phone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  <button className="save-name">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;