const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Vérification si la clé est présent
    if (!process.env.RANDOM_SECRET_KEY) {
      throw new Error("env non chargé ou clé manquante");
    }
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_KEY);    
    req.user = { id: decodedToken.userId };
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
