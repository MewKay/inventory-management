const { getProductDetails } = require("../db/queries");

const productGet = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = await getProductDetails(productId);
  res.render("productDetails", { product: product });
};

module.exports = { productGet };
