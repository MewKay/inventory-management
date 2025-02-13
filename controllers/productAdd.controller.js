const { matchedData } = require("express-validator");
const { getAllCategories, addProduct } = require("../db/queries");
const emptyProductFields = require("../utils/constants/emptyProductFields");
const validateProductForm = require("../middlewares/validators/validateProductForm");
const productAddValidationHandler = require("../middlewares/validators/productAdd.validationHandler");

const productAddGet = [
  async (req, res) => {
    const categories = await getAllCategories();

    res.render("productAdd", {
      title: "Add new product",
      product: emptyProductFields,
      categories: categories,
      errors: [],
    });
  },
];

const productAddNew = [
  validateProductForm,
  productAddValidationHandler,
  async (req, res) => {
    const newProduct = matchedData(req);
    const { id: newProductId } = await addProduct(newProduct);

    res.redirect(`/view/products/${newProductId}`);
  },
];

module.exports = { productAddGet, productAddNew };
