const { matchedData } = require("express-validator");
const { getProductDetails } = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");

const productGet = [
  validateProductParam,
  paramValidationHandler,
  async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    res.render("productDetails", { product: product });
  },
];

module.exports = { productGet };
