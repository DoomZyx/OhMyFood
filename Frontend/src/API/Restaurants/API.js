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

export async function createRestaurant(restaurantData) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.warn("Aucun token trouvé. Redirection nécessaire ou blocage de l'appel.");
    throw new Error("Utilisateur non authentifié");
  }

  try {
    const formData = new FormData();

    // Données du restaurant
    formData.append('name', restaurantData.name);
    formData.append('street', restaurantData.street);
    formData.append('city', restaurantData.city);
    formData.append('postalCode', restaurantData.postalCode);
    formData.append('openinghours', restaurantData.openinghours);
    formData.append('phoneNumber', restaurantData.phoneNumber);
    formData.append('deliveryZone', restaurantData.deliveryZone);
    formData.append('typeOfBusiness', restaurantData.typeOfBusiness);
    formData.append('siret', restaurantData.siret);
    
    // Services
    formData.append('dineIn', restaurantData.dineIn);
    formData.append('takeout', restaurantData.takeout);
    formData.append('delivery', restaurantData.delivery);

    // Images et documents
    if (restaurantData.imageUrl) {
      formData.append('imageUrl', restaurantData.imageUrl);
    }
    if (restaurantData.identityDocumentUrl) {
      formData.append('identityDocumentUrl', restaurantData.identityDocumentUrl);
    }
    if (restaurantData.proofOfOwnershipUrl) {
      formData.append('proofOfOwnershipUrl', restaurantData.proofOfOwnershipUrl);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("Erreur serveur :", message);
      throw new Error(`Erreur API : ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur lors de la création du restaurant :", err);
    throw err;
  }
}

