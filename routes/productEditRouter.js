const { Router } = require("express");
const productEditRouter = Router({ mergeParams: true });
const controller = require("../controllers/productEditController");

productEditRouter.get("/", controller.productEditGet);

module.exports = productEditRouter;
