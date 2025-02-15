const { Router } = require("express");
const categoryEditRouter = Router();

const controller = require("../controllers/categoryEdit.controller");

categoryEditRouter.get("/", controller.categoryEditGet);

module.exports = categoryEditRouter;
