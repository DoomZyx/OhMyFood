import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/homepage";
import "./style.scss";
import Menus from "./Pages/MenuPage/menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menus/:id" element={<Menus />} />
      </Routes>
    </Router>
  );
}

export default App;
