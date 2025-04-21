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