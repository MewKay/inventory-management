const { Router } = require("express");

const productDetailsRouter = Router({ mergeParams: true });

productDetailsRouter.get("/", (req, res) => {
  const productId = parseInt(req.params.productId);
  res.render("productDetails", { productId: productId });
});

module.exports = productDetailsRouter;
