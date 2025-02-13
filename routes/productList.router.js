const { Router } = require("express");
const controller = require("../controllers/productList.controller");

const productListRouter = Router();

productListRouter.get("/", controller.productsGet);

module.exports = productListRouter;
