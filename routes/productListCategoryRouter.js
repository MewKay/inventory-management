const { Router } = require("express");

const productListCategoryRouter = Router();

productListCategoryRouter.get("/", (req, res) => {
  res.render("productListCategory");
});

module.exports = productListCategoryRouter;
