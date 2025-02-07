const { Router } = require("express");
const productEditRouter = Router({ mergeParams: true });

productEditRouter.get("/", (req, res) => {
  res.send("Hello Product Edit!");
});

module.exports = productEditRouter;
