const Express = require("express");
const setupRouter = require("./setup/router");
const setupMiddleware = require("./setup/middleware");
const setupDatabase = require("./setup/database");
const Config = require("./config");
const path = require("path");

const app = Express();

app.use(Express.static(path.resolve(__dirname, "../client/build")));

setupMiddleware(app);

async function startApp() {
  const db = await setupDatabase();
  setupRouter(app, db);
  // All other GET requests not handled before will return our React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
  app.listen(Config.port, () => {
    console.log("Server started at port", Config.port);
  });
}

startApp().catch(console.error);
