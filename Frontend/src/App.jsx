import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.scss";
import Homepage from "./Pages/Homepage/homepage";
import Menus from "./Pages/MenuPage/menu";
import Login from "./Pages/Login/login";
import Profile from "./Pages/ProfilePage/profile";
import Registration from "./Pages/Registration/registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menus/:id" element={<Menus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={< Registration/>} />
      </Routes>
    </Router>
  );
}

export default App;
