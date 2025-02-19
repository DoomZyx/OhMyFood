import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.scss";
import Homepage from "./Pages/Homepage/homepage";
import Menus from "./Pages/MenuPage/menu";
import Login from "./Pages/Login/login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/menus/:id" element={<Menus />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
