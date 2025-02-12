const { matchedData } = require("express-validator");
const {
  getProductDetails,
  getAllCategories,
  updateProduct,
  deleteProduct,
} = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");
const validateProductForm = require("../middlewares/validators/validateProductForm");
const errorInvalidProductUpdateDataHandler = require("../middlewares/errors/errorInvalidProductUpdateDataHandler");
const errorInvalidParamHandler = require("../middlewares/errors/errorInvalidParamHandler");

const productEditGet = [
  validateProductParam,
  errorInvalidParamHandler,
  async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    const categories = await getAllCategories();

    res.render("productEdit", {
      title: "Edit Product",
      product: product,
      categories: categories,
      errors: [], // Pass in no-error array to avoid ReferenceError
    });
  },
];

const productEditUpdate = [
  validateProductParam,
  errorInvalidParamHandler,
  validateProductForm,
  errorInvalidProductUpdateDataHandler,
  async (req, res) => {
    const { productId, ...formData } = matchedData(req);
    const product = { id: productId, ...formData };

    await updateProduct(product);

    res.redirect(`/view/products/${product.id}`);
  },
];

const productEditDelete = [
  validateProductParam,
  errorInvalidParamHandler,
  async (req, res) => {
    const { productId } = matchedData(req);
    await deleteProduct(productId);
    res.send(
      `Product ${productId} was deleted successfully! (For real this time)!`,
    );
  },
];

module.exports = { productEditGet, productEditUpdate, productEditDelete };
