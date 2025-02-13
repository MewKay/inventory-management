const { matchedData } = require("express-validator");
const { getAllCategories, addProduct } = require("../db/queries");
const emptyProductFields = require("../utils/constants/emptyProductFields");
const productFormValidator = require("../middlewares/validators/productForm.validator");
const productAddValidationHandler = require("../middlewares/validators/productAdd.validationHandler");
const asyncHandler = require("express-async-handler");

const productAddGet = [
  asyncHandler(async (req, res) => {
    const categories = await getAllCategories();

    res.render("productAdd", {
      title: "Add new product",
      product: emptyProductFields,
      categories: categories,
      errors: [],
    });
  }),
];

const productAddNew = [
  productFormValidator,
  productAddValidationHandler,
  asyncHandler(async (req, res) => {
    const newProduct = matchedData(req);
    const { id: newProductId } = await addProduct(newProduct);

    res.redirect(`/view/products/${newProductId}`);
  }),
];

module.exports = { productAddGet, productAddNew };
