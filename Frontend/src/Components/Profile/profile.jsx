import "./_profile.scss";
import foodplate1 from "../../../public/images/foodplate1.webp";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "../../../node_modules/react-redux/dist/react-redux";
import { fetchUserProfile } from "../../Store/FetchDataAPI/GetDataUser/ThunkAPI";


function UserInfo() {
 const { user } = useSelector((state) => state.auth);
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 
   const dispatch = useDispatch();

   useEffect(() => {
     if (isAuthenticated && (!user || user.id === "")) {
       dispatch(fetchUserProfile(sessionStorage.getItem("token")));
     }
   }, [dispatch, isAuthenticated, user?.id]);
  return (
    <>
      <div className="background-profile">
        <img src={foodplate1} alt="" />
        <div className="profile-container">
          <div className="layout-user-profile">
            <div className="user-circle">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
