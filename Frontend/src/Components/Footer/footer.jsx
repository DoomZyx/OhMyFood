function Footer() {
  return (
    <>
      <footer>
        <div className="layout">
          <div className="foottitle">
            <h4>ohmyfood</h4>
          </div>
          <div className="first">
            <a href="#">
              <i className="fa-solid fa-utensils"></i>
              <p>Proposer un restaurant</p>
            </a>
            <a href="#">
              <i className="fa-solid fa-handshake-angle"></i>
              <p>Devenir partenaire</p>
            </a>
          </div>
          <div className="second">
            <a href="#">
              <p>Mention légales</p>
            </a>
            <a href="mailto:ohmyfood@gmail.com"> Contact </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
