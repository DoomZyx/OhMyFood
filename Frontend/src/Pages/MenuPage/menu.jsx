import { useState, useEffect } from "react";
import { getMenus, getRestaurants } from "../../API/API";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

function Menus({ restaurantId }) {
  const [data, setData] = useState([]);
  const [menus, setMenus] = useState([]);

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
    const fetchData = async () => {
      const result = await getMenus(restaurantId);
      setMenus(result);
    };

    fetchData();
  }, [restaurantId]);
  
  return (
    <>
      <Header />
      <main className="menu__content">
        <section className="menu">
          <div className="title-menu">
            <h1>
              {data.find((restaurant) => restaurant.id === restaurantId)
                ?.name || "Chargement..."}
            </h1>

            <label htmlFor="" className="btn__like">
              <input type="checkbox" className="toggle-heart" />
              <i className="fa-regular fa-heart"></i>
              <i className="fa-solid fa-heart"></i>
            </label>
          </div>

          {menus.length > 0 ? (
            menus.map((menu) => (
              <div key={menu.id} className="main__course">
                <h2>{menu.ordre}</h2>
                <label htmlFor="">
                  <input type="checkbox" className="toggle-heart" />
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
