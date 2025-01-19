import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

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
                  <div className="card-txt">
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
                  <div className="card-txt">
                  </div>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
              <article className="card">
                  <div className="card-txt">
                  </div>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
                <span className="new"> Nouveau </span>
              </article>
              <article className="card">
                  <div className="card-txt">
                  </div>
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
