const { matchedData } = require("express-validator");
const { getProductDetails } = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");
const errorInvalidParamHandler = require("../middlewares/errors/errorInvalidParamHandler");

const productGet = [
  validateProductParam,
  errorInvalidParamHandler,
  async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    res.render("productDetails", { product: product });
  },
];

module.exports = { productGet };
