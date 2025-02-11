import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="layout">
        <div className="foottitle">
          <h4>ohmyfood</h4>
        </div>
        <div className="first">
          <Link to="#" className="footer-link">
            <i className="fa-solid fa-utensils"></i>
            <span>Proposer un restaurant</span>
          </Link>
          <Link to="#" className="footer-link">
            <i className="fa-solid fa-handshake-angle"></i>
            <span>Devenir partenaire</span>
          </Link>
        </div>
        <div className="second">
          <Link to="#" className="footer-link">
            Mention légales
          </Link>
          <Link to="mailto:ohmyfood@gmail.com" className="footer-link">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
