const Express = require("express");
const setupRouter = require("./setup/router");
const setupMiddleware = require("./setup/middleware");
const setupDatabase = require("./setup/database");
const Config = require("./config");
const path = require("path");

const app = Express();

setupMiddleware(app);

// app.use(Express.static(path.resolve(__dirname, "../frontend/build")));
// app.use(Express.static("../frontend/build"));

app.use(Express.static(path.join(__dirname, "..", "build")));
app.use(Express.static("public"));

async function startApp() {
  const db = await setupDatabase();
  setupRouter(app, db);
  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
    res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
  });
  app.listen(Config.port, () => {
    console.log("Server started at port", Config.port);
  });
}

startApp().catch(console.error);
