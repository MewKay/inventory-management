const { Router } = require("express");
const productDetailsController = require("../controllers/productDetailsController");

const productDetailsRouter = Router({ mergeParams: true });

productDetailsRouter.get("/", productDetailsController.productGet);

module.exports = productDetailsRouter;
