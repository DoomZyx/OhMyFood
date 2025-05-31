import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { getRestaurants } from "../../../../API/Restaurants/API";
import MiniLoader from "../../../../Components/Animations/Loader/MiniLoader/miniLoader";

function Restaurants() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await getRestaurants();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="restaurant">
      <div className="restaurant-title">
        <h2>Restaurants</h2>
      </div>
      <div className="flex-card">
        {loading ? (
          <div className="loader-restaurants-wrapper">
          <MiniLoader />
          </div>
        ) : data && data.length > 0 ? (
          data.map((restaurant, index) => (
            <article className="card" key={restaurant._id || index}>
              <Link to={`/menus/${restaurant._id}`} className="card-link">
                <img
                  src={`${import.meta.env.VITE_API_URL}${restaurant.imageUrl}`}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="card-txt">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.lieu || restaurant.address.lieu}</p>
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
  );
}

export default Restaurants;
