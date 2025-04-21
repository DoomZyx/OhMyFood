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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
  });
  
  // Affiche ou cache dynamiquement un input
  const toggleInput = (field) => {
    setVisibleInputs((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Remplit formData avec les valeurs de l'utilisateur (à l’arrivée des données)
  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || "",
        prenom: user.prenom || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Stocke les valeurs modifiables des inputs
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    phone: "",
  });

  // Met à jour la valeur d’un input dans formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div className="background-profile">
      <img src={foodplate1} alt="foodplate" />

      <div className="profile-container">
        
        <div className="layout-user-profile">
          <h2>Informations personnelles</h2>

          <div className="user-circle">
            <i className="fa-solid fa-user"></i>
          </div>

          <div className="profile-name">
            <h3>{user.prenom}</h3>
            <button onClick={() => toggleInput("showPrenom")}>Modifier</button>
          </div>

          {visibleInputs.showPrenom && (
            <div className="input-change-surname">
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
              />
              <button className="save-name">
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          )}

          <div className="profile-surname">
            <h3>{user.nom}</h3>
            <button onClick={() => toggleInput("showNom")}>Modifier</button>
          </div>

          {visibleInputs.showNom && (
            <div className="input-change-surname">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
              />
              <button className="save-name">
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          )}

          <div className="profile-phoneNumber">
            <h3>{user.phone}</h3>
            <button onClick={() => toggleInput("showPhone")}>Modifier</button>
          </div>

          {visibleInputs.showPhone && (
            <div className="input-change-phone">
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <button className="save-name">
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default UserInfo;