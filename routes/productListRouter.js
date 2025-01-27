const { Router } = require("express");
const productListController = require("../controllers/productListController");

const productListRouter = Router();

productListRouter.get("/", productListController.productsGet);

module.exports = productListRouter;
