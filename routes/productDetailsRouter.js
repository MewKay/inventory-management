const { Router } = require("express");
const controller = require("../controllers/productDetails.controller");

const productDetailsRouter = Router({ mergeParams: true });

productDetailsRouter.get("/", controller.productGet);

module.exports = productDetailsRouter;
