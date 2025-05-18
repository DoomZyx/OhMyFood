const http = require("http");
const app = require("./app");
require("dotenv").config();

// Normalisation du port
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Gestion des erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") throw error;
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

// Création et lancement du serveur
const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : `http://0.0.0.0:${port}`;
  console.log("Listening on " + bind);
});

server.listen(port, "0.0.0.0");
