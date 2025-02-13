const { Router } = require("express");
const controller = require("../controllers/productListCategory.controller");

const productListCategoryRouter = Router({ mergeParams: true });

productListCategoryRouter.get("/", controller.productsPerCategoryGet);

module.exports = productListCategoryRouter;
