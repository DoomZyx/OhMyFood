export const addToCart = async (menuId, quantity) => {
 const token = sessionStorage.getItem("token");

 if (!token) {
   console.warn("Aucun token trouvé. Redirection nécessaire ou blocage de l'appel.");
   throw new Error("Utilisateur non authentifié");
 }

 try {
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify({ menuId, quantity }),
   });

   if (!response.ok) {
     const message = await response.text();
     console.error("Erreur serveur :", message);
     throw new Error(`Erreur API : ${response.status}`);
   }

   return await response.json();
 } catch (err) {
   console.error("Erreur lors de l'ajout au panier :", err);
   throw err;
 }
}

export const getCart = async () => {
 const token = sessionStorage.getItem("token");

 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
   method: "GET",
   headers: {
     Authorization: `Bearer ${token}`,
   },
 });

 if (!response.ok) throw new Error("Erreur lors de la récupération du panier");

 return await response.json();
};

export const removeFromCart = async (menuId) => {
 const token = sessionStorage.getItem("token");
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${menuId}`, {
   method: "DELETE",
   headers: {
     Authorization: `Bearer ${token}`,
   },
 });

 if (!response.ok) throw new Error("Erreur lors de la suppression du menu");

 return await response.json();
};

export const clearCart = async () => {
 const token = sessionStorage.getItem("token");

 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/clear`, {
   method: "DELETE",
   headers: {
     Authorization: `Bearer ${token}`,
   },
 });

 if (!response.ok) {
   const error = await response.json();
   throw new Error(error.message || "Erreur API");
 }

 return await response.json();
};


