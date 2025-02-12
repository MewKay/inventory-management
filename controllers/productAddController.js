const { getAllCategories } = require("../db/queries");

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

module.exports = { productAddGet };
