const API_BASE_URL = "http://localhost:3001/api";

export async function getRestaurants() {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const restaurants = await response.json();
    console.log(restaurants);
    return restaurants;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return [];
  }
}

// Appel de la fonction pour tester
getRestaurants().then((data) => {
  console.log("Données reçues :", data);
});
