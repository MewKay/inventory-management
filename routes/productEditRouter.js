const { Router } = require("express");
const productEditRouter = Router({ mergeParams: true });
const controller = require("../controllers/productEditController");

productEditRouter.get("/", controller.productEditGet);
productEditRouter.post("/", controller.productEditUpdate);
productEditRouter.post("/delete", controller.productEditDelete);

module.exports = productEditRouter;
