module.exports = {
  databaseUri:
    process.env.DATABASE_URI ||
    "<mongoDB-URL>",
  port: process.env.PORT || 4000,
};
