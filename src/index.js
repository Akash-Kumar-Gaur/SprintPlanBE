const Express = require("express");
const setupRouter = require("./setup/router");
const setupMiddleware = require("./setup/middleware");
const setupDatabase = require("./setup/database");
const Config = require("./config");
const path = require("path");

const app = Express();

app.use(Express.static(path.join(__dirname, "..", "build")));
app.use(Express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
});

setupMiddleware(app);

async function startApp() {
  const db = await setupDatabase();
  setupRouter(app, db);
  app.use(Express.static(path.join(__dirname, "..", "build")));
  app.use(Express.static("public"));

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
  });
  app.listen(Config.port, () => {
    console.log("Server started at port", Config.port);
  });
}

startApp().catch(console.error);
