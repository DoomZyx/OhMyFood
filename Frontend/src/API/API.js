const API_BASE_URL = "http://localhost:3001/api";

let restaurants = []

export async function getRestaurants() {
 try {
  const response = await fetch(`${API_BASE_URL}/restaurants`)
  restaurants = await response.json();
  console.log(restaurants)
 } catch (error) {
  console.error("Erreur lors de la requête :", error)
 }
}

getRestaurants();