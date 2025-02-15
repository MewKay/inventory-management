const { matchedData } = require("express-validator");
const { getProductDetails } = require("../db/queries");
const productParamValidator = require("../middlewares/validators/productParam.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");
const asyncHandler = require("express-async-handler");
const NotFoundError = require("../errors/NotFoundError");

const productGet = [
  productParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);

    if (!product) {
      throw new NotFoundError("Product requested was not found");
    }

    res.render("productDetails", { product: product });
  }),
];

module.exports = { productGet };
