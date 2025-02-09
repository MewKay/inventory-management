const { getProductDetails, getAllCategories } = require("../db/queries");

const productEditGet = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = await getProductDetails(productId);
  const categories = await getAllCategories();

  res.render("productEdit", {
    title: "Edit Product",
    product: product,
    categories: categories,
  });
};

module.exports = { productEditGet };
