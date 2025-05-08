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

export async function createRestaurant(formData) {
  const token = sessionStorage.getItem("token");

  if (!token) throw new Error("Utilisateur non authentifié");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!response.ok) {
    const message = await response.text();
    console.error("Erreur serveur :", message);
    throw new Error(`Erreur API : ${response.status}`);
  }

  return await response.json();
}