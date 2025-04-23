import { useState, useEffect } from "react";
import { getMenus } from "../../API/Menus/API";
import { getRestaurants } from "../../API/Restaurants/API";
import { addToCart } from "../../API/Cart/API";

import { useParams } from "react-router-dom";

import "../../Components/Buttons/_buttons.scss";

import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

function Menus({ restaurant_id }) {
  const [data, setData] = useState([]);
  const [menus, setMenus] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRestaurants();
        setData(result);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des restaurants :",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await getMenus(id);
          setMenus(result);
        } catch (error) {
          console.error("Erreur lors de la récupération des menus :", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const groupedMenus = menus.reduce((acc, menu) => {
    if (!acc[menu.ordre]) {
      acc[menu.ordre] = [];
    }
    acc[menu.ordre].push(menu);
    return acc;
  }, {});
  
  const handleAddToCart = async (menuId) => {
    try {
      await addToCart(menuId, 1);
      console.log("token", sessionStorage.getItem("token"));
      console.log("Ajouté au panier");
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier");
      console.error(err);
    }
  };

  return (
    <>
      <Loader />

      <Header />

      {data && data.length > 0 ? (
        data
          .filter((restaurant) => String(restaurant._id) === String(id))
          .map((restaurant) => (
            <div className="image__brand" key={restaurant._id}>
              <img
                src={`${import.meta.env.VITE_API_URL}${restaurant.imageUrl}`}
                alt={restaurant.name}
                className="restaurant-image"
              />
            </div>
          ))
      ) : (
        <p>Chargement en cours...</p>
      )}

      <main className="menu__content">
        <section className="menu">
          {data
            .filter((restaurant) => String(restaurant._id) === String(id))
            .map((restaurant) => (
              <div key={restaurant._id} className="title-menu">
                <h1>{restaurant.name}</h1>
                <label className="btn__like">
                  <input type="checkbox" className="toggle-heart" />
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </label>
              </div>
            ))}

          {menus.length > 0 ? (
            Object.keys(groupedMenus).map((ordre) => (
              <div key={ordre} className="menu-group">
                <h2>{ordre}</h2>
                {groupedMenus[ordre].map((menu) => (
                  <div
                    key={menu._id}
                    className="main__course"
                    onClick={() => handleAddToCart(menu._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        className="toggle-heart"
                      />
                      <div className="plate__list">
                        <h3>{menu.name}</h3>
                        <h4>{menu.namesuite}</h4>
                        <span className="plate__price">{menu.price} €</span>
                        <div className="plate__validation">
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Chargement des menus...</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Menus;

