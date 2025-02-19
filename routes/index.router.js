const { Router } = require("express");
const indexRouter = Router();

const controller = require("../controllers/index.controller");

indexRouter.get("/", controller.homeGet);
indexRouter.get("/view", controller.viewGet);
indexRouter.get("/edit", controller.editGet);
indexRouter.post("/edit", controller.editProductPost);

module.exports = indexRouter;
