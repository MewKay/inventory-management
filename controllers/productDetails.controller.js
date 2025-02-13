const { matchedData } = require("express-validator");
const { getProductDetails } = require("../db/queries");
const productParamValidator = require("../middlewares/validators/productParam.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");

const productGet = [
  productParamValidator,
  paramValidationHandler,
  async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    res.render("productDetails", { product: product });
  },
];

module.exports = { productGet };
