const { validationResult, matchedData } = require("express-validator");
const { getProductDetails, getAllCategories } = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");

const productEditGet = [
  validateProductParam,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    const categories = await getAllCategories();

    res.render("productEdit", {
      title: "Edit Product",
      product: product,
      categories: categories,
    });
  },
];

module.exports = { productEditGet };
