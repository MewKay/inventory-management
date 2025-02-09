const { matchedData, validationResult } = require("express-validator");
const { getProductDetails } = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");

const productGet = [
  validateProductParam,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    res.render("productDetails", { product: product });
  },
];

module.exports = { productGet };
