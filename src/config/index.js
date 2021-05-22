module.exports = {
  databaseUri:
    process.env.DATABASE_URI ||
    "mongodb+srv://akashadmin:6HvU1p4b7G82LkbD@cluster0.rdl1h.mongodb.net/sprintplanTest?retryWrites=true&w=majority",
  port: process.env.PORT || 4000,
};
