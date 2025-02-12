const { Router } = require("express");
const productAddRouter = Router();
const controller = require("../controllers/productAddController");

productAddRouter.get("/", controller.productAddGet);
productAddRouter.post("/", controller.productAddNew);

module.exports = productAddRouter;
