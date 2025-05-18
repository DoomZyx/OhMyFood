// // IP Tailscale autorisée
// const allowedIPs = [process.env.IP_ELITEBOOK]; // IP PC portable

// // Middleware pour limiter les IP entrantes
// app.use((req, res, next) => {
//   const remoteIP = req.ip.replace("::ffff:", "");  // Express renvoies l'IP au format IPv6 | Supprime le préfixe "::ffff:" pour obtenir l'IP IPv4 classique

//   console.log("Requête entrante depuis :", remoteIP);

//   if (!allowedIPs.includes(remoteIP)) {
//     console.warn(`Refus de connexion depuis : ${remoteIP}`);
//     return res.status(403).send("Accès interdit");
//   }
//   next();
// });