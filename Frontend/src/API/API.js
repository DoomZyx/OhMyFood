const API_BASE_URL = "http://localhost:3001/api";

export async function getRestaurants() {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const restaurants = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return [];
  }
}


export async function getMenus(restaurantId) {
  try {
    const response = await fetch(`${API_BASE_URL}/menus/${restaurantId}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return [];
  }
}
