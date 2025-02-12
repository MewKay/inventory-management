const { Router } = require("express");
const productAddRouter = Router();
const controller = require("../controllers/productAddController");

productAddRouter.get("/", controller.productAddGet);

module.exports = productAddRouter;
