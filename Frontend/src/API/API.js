// Affiche les menus et restaurants

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

// signup 

export async function signupUser(userData) {
  const response = await fetch(
   `${import.meta.env.VITE_API_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur inconnue");
  }

  return response.json();
}


// Login 
export async function loginUser({ email, password }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ email, password });

  const requestOption = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/login`,
      requestOption
    );
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
}


export async function getUserProfile(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

export const addToCart = async (menuId, quantity) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token)
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/post`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ menuId, quantity }),
  }); 
  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout au panier');
  }
  return await response.json();
}