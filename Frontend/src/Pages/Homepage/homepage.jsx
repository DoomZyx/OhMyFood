import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { getRestaurants } from "../../API/API";

function Homepage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRestaurants();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Loader />
      <Header />

      <div className="homepage">
        <main>
          <section className="und_header">
            <h2>Réservez le menu qui vous convient</h2>
            <h3>
              Découvrez des restaurants d'exception, sélectionnés par nos soins
            </h3>
            <div className="btn-place">
              <button className="explore-btn">Explorer nos restaurants</button>
            </div>
          </section>

          <section className="restaurant">
            <div className="restaurant-title">
              <h2>Restaurants</h2>
            </div>

            <div className="flex-card">
              {data && data.length > 0 ? (
                data.map((restaurant) => (
                  <article className="card" key={restaurant.id}>
                    <Link to={`/menus/${restaurant.id}`} className="card">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${restaurant.photo}`}
                        alt={restaurant.name}
                        className="restaurant-image"
                      />
                      <div className="card-txt">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.lieu}</p>
                      </div>
                    </Link>
                    <label className="btn__like">
                      <input type="checkbox" className="toggle-heart" />
                      <i className="fa-regular fa-heart"></i>
                      <i className="fa-solid fa-heart"></i>
                    </label>
                    <span className="new"> Nouveau </span>
                  </article>
                ))
              ) : (
                <p>Chargement en cours...</p>
              )}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  );
}

export default Homepage;
