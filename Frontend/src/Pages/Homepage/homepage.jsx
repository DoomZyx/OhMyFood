import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

import Lapalette from "../../../assets/restaurants/la_palette_des_gouts.jpg";
import LanoteEnchantee from "../../../assets/restaurants/la_note_enchantee.jpg";
import ALaFrancaise from "../../../assets/restaurants/a_la_francaise.jpg";
import LeDelice from "../../../assets/restaurants/le_delice_des_sens.jpg";

function Homepage() {
  return (
    <>
      <Header />
      <div className="loader">
        <div className="circles c1"></div>
        <div className="circles c2"></div>
        <div className="circles c3"></div>
      </div>

      <div className="homepage">
        <main>
          <section className="und_header">
            <h2>Réservez le menu qui vous convient</h2>
            <h3>
              Découvrez des restaurants d'exception, selectionnés par nos soins
            </h3>
            <div className="btn-place">
              <button className="explore-btn">Explorer nos restaurants</button>
            </div>
          </section>

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
          <section className="restaurant">
            <div className="restaurant-title">
              <h2>Restaurants</h2>
            </div>

            <div className="flex-card">
              <article className="card">
                <a href="./la_palette_du_gout.html">
                  <img src={Lapalette} alt="La palette du goût" />
                  <div className="card-txt">
                    <h3>La palette du goût</h3>
                    <p>Ménilmontant</p>
                  </div>
                </a>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
              <article className="card">
                <a href="./la_note_enchantee.html">
                  <img src={LanoteEnchantee} alt="La note enchantée" />
                  <div className="card-txt">
                    <h3>La note enchantée</h3>
                    <p>Charonne</p>
                  </div>
                </a>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
              <article className="card">
                <a href="./a_la_francaise.html">
                  <img src={ALaFrancaise} alt="À la française" />
                  <div className="card-txt">
                    <h3>À la française</h3>
                    <p>Cité Rouge</p>
                  </div>
                </a>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
              <article className="card">
                <a href="./le_delice_des_sens.html">
                  <img src={LeDelice} alt="Le délice des sens" />
                  <div className="card-txt">
                    <h3>Le délice des sens</h3>
                    <p>Folie-Méricourt</p>
                  </div>
                </a>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Homepage;
