import { Routes, Route } from "react-router-dom";
import "./style.scss";
import Homepage from "./Pages/Homepage/homepage";
import Menus from "./Pages/MenuPage/menu";
import Login from "./Pages/Login/login";
import Profile from "./Pages/ProfilePage/profile";
import Registration from "./Pages/Registration/registration";
import ProtectedRoute from "./Components/ProtectedRoute/protectedRouteAuth";
import ProtectedRouteOwner from "./Components/ProtectedRoute/protectedRouteOwner";
import RestaurantProfile from "./Pages/RestaurantProfile/restaurantProfile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menus/:id" element={<Menus />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants-profile"
          element={
            <ProtectedRouteOwner>
              <RestaurantProfile />
            </ProtectedRouteOwner>
          }
        />
      </Routes>
  );
}

export default App;
