const { getAllProducts } = require("../db/queries");

const productsGet = async (req, res) => {
  const products = await getAllProducts();
  res.render("productList", { products: products });
};

module.exports = { productsGet };
