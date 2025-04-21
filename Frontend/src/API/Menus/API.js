export async function getMenus(restaurant_id) {
 try {
   const response = await fetch(
     `${import.meta.env.VITE_API_URL}/api/menus/${restaurant_id}`
   );
   if (!response.ok) {
     throw new Error(`Erreur HTTP : ${response.status}`);
   }
   return await response.json();
 } catch (error) {
   console.error("Erreur lors de la requête :", error);
   return [];
 }
}