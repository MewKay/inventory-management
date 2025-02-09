const { getProductDetails } = require("../db/queries");

const productEditGet = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = await getProductDetails(productId);
  res.send(product); // TODO: Pass data to view
};

module.exports = { productEditGet };
