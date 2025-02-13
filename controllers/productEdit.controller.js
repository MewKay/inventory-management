const { matchedData } = require("express-validator");
const {
  getProductDetails,
  getAllCategories,
  updateProduct,
  deleteProduct,
} = require("../db/queries");
const productParamValidator = require("../middlewares/validators/productParam.validator");
const productFormValidator = require("../middlewares/validators/productForm.validator");
const productUpdateValidationHandler = require("../middlewares/validators/productUpdate.validationHandler");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");
const asyncHandler = require("express-async-handler");

const productEditGet = [
  productParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    const categories = await getAllCategories();

    res.render("productEdit", {
      title: "Edit Product",
      product: product,
      categories: categories,
      errors: [], // Pass in no-error array to avoid ReferenceError
    });
  }),
];

const productEditUpdate = [
  productParamValidator,
  paramValidationHandler,
  productFormValidator,
  productUpdateValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId, ...formData } = matchedData(req);
    const product = { id: productId, ...formData };

    await updateProduct(product);

    res.redirect(`/view/products/${product.id}`);
  }),
];

const productEditDelete = [
  productParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId } = matchedData(req);
    const { name: productName } = await getProductDetails(productId);
    await deleteProduct(productId);

    res.render("productDeletedSuccess", {
      title: "Operation Success",
      productName: productName,
    });
  }),
];

module.exports = { productEditGet, productEditUpdate, productEditDelete };
