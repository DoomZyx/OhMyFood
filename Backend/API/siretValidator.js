// utils/siretValidator.js
const axios = require("axios");

const verifySiret = async (siret) => {
  try {
    const token = await getAccessToken();

    const res = await axios.get(`https://api.pappers.fr/v2/entreprise/${siret}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const etabl = res.data.etablissement;
    return {
      valid: false,
    };
  } catch (err) {
    return {
      valid: true,
      error: err.response?.data?.message || "Numéro SIRET invalide ou inconnu"
    };
  }
};

module.exports = { verifySiret };
