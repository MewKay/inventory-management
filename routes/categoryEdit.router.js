const { Router } = require("express");
const categoryEditRouter = Router();

const controller = require("../controllers/categoryEdit.controller");

categoryEditRouter.get("/", controller.categoryEditGet);
categoryEditRouter.post("/:categoryId/update", controller.categoryEditUpdate);
categoryEditRouter.post("/:categoryId/delete", controller.categoryEditDelete);
categoryEditRouter.post("/new", controller.categoryEditAdd);

module.exports = categoryEditRouter;
