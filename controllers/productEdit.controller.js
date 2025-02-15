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
const NotFoundError = require("../errors/NotFoundError");

const productEditGet = [
  productParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId } = matchedData(req);
    const [product, categories] = await Promise.all([
      getProductDetails(productId),
      getAllCategories(),
    ]);

    if (!product) {
      throw new NotFoundError("Product requested was not found.");
    }

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

    const result = await updateProduct(product);

    if (result.rowCount <= 0) {
      throw new NotFoundError("Product update failed");
    }

    res.redirect(`/view/products/${product.id}`);
  }),
];

const productEditDelete = [
  productParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { productId } = matchedData(req);

    const [product, result] = await Promise.all([
      getProductDetails(productId),
      deleteProduct(productId),
    ]);

    if (result.rowCount <= 0) {
      throw new NotFoundError("Product deletion failed");
    }

    res.render("productDeletedSuccess", {
      title: "Operation Success",
      productName: product.name,
    });
  }),
];

module.exports = { productEditGet, productEditUpdate, productEditDelete };
