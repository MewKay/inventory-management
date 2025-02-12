const { matchedData, validationResult } = require("express-validator");
const { getAllCategories, addProduct } = require("../db/queries");
const validateProductForm = require("../middlewares/validators/validateProductForm");

const emptyFieldsProduct = {
  name: "",
  quantity: "",
  unit: "",
  price: "",
  category_id: "",
};

const productAddGet = [
  async (req, res) => {
    const categories = await getAllCategories();

    res.render("productAdd", {
      title: "Add new product",
      product: emptyFieldsProduct,
      categories: categories,
      errors: [],
    });
  },
];

const productAddNew = [
  validateProductForm,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send("Invalid Inputs"); // TODO: Error handling to be extract to its own module.
    }

    const newProduct = matchedData(req);
    const { id: newProductId } = await addProduct(newProduct);

    res.redirect(`/view/products/${newProductId}`);
  },
];

module.exports = { productAddGet, productAddNew };
