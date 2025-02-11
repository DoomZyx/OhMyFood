function Functionning() {
 return (
  <section className="functionning">
  <h2>Fonctionnement</h2>

  <div className="functionning-group">
      <div className="functionning-step">
        <div className="circle">
          <p className="number">1</p>
        </div>
        <i className="fa-solid fa-mobile-screen-button"></i>
        <p className="functionning-txt">Choisissez un restaurant</p>
      </div>
      <div className="functionning-step">
        <div className="circle">
          <p className="number">2</p>
        </div>
        <i className="fa-solid fa-list-ul"></i>
        <p className="functionning-txt">Composez votre menu</p>
      </div>
      <div className="functionning-step">
        <div className="circle">
          <p className="number">3</p>
        </div>
        <i className="fa-solid fa-store"></i>
        <p className="functionning-txt">Dégustez au restaurant</p>
      </div>
  </div>
</section>
 )
}

export default Functionning;