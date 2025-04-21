export async function getRestaurants() {
 try {
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`);
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