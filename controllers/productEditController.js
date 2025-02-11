const { validationResult, matchedData } = require("express-validator");
const {
  getProductDetails,
  getAllCategories,
  updateProduct,
} = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");
const validateProductForm = require("../middlewares/validators/validateProductForm");

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

const productEditUpdate = [
  validateProductParam,
  validateProductForm,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const isProductIdValid = Object.keys(errors.mapped())[0] !== "productId";

      if (!isProductIdValid) {
        return res.status(400).send(errors.mapped().productId.msg);
      }

      const { productId } = matchedData(req);
      const product = await getProductDetails(productId);
      const categories = await getAllCategories();

      return res.status(400).render("productEdit", {
        title: "Edit Product",
        product: product,
        categories: categories,
        errors: errors.array(),
      });
    }

    const { productId, ...formData } = matchedData(req);
    const product = { id: productId, ...formData };

    await updateProduct(product);

    res.redirect(`/view/products/${product.id}`);
  },
];

module.exports = { productEditGet, productEditUpdate };
