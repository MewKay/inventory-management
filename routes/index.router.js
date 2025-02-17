const { Router } = require("express");
const indexRouter = Router();

const controller = require("../controllers/index.controller");

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/view", controller.viewGet);
indexRouter.get("/edit", controller.editGet);

module.exports = indexRouter;
