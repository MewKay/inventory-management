const { Router } = require("express");
const productAddRouter = Router();
const controller = require("../controllers/productAdd.controller");

productAddRouter.get("/", controller.productAddGet);
productAddRouter.post("/", controller.productAddNew);

module.exports = productAddRouter;
