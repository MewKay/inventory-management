const { getAllProducts } = require("../db/queries");

const productsGet = async (req, res) => {
  const { sort } = req.query;
  const products = await getAllProducts(sort);
  res.render("productTable", { products: products });
};

module.exports = { productsGet };
