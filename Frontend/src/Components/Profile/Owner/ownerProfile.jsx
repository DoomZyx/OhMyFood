import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OwnerProfile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.verified) {
    return <Navigate to="/register/owner" replace />;
  }
  return (
    <>
      <div className="background-profile-owner">
        <img src="" alt="" />

        <div className="profil-owner-container">
           {isAuthenticated && user && (
          <div className="layout-owner-profile">
            <div className="owner-picture">
              <img src={`http:://localhost:3000${user.imageUrl}`} alt="" />
            </div>
            <div className="restaurant_name">
             
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
