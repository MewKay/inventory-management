const { Router } = require("express");

const categoryEditRouter = Router();

categoryEditRouter.get("/", (req, res) => {
  res.send("Hello Category Edit !!");
});

module.exports = categoryEditRouter;
