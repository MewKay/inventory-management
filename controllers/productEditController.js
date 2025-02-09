const { validationResult, matchedData } = require("express-validator");
const {
  getProductDetails,
  getAllCategories,
  updateProduct,
} = require("../db/queries");
const validateProductParam = require("../middlewares/validators/validateProductParam");

const productEditGet = [
  validateProductParam,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

    const { productId } = matchedData(req);
    const product = await getProductDetails(productId);
    const categories = await getAllCategories();

    res.render("productEdit", {
      title: "Edit Product",
      product: product,
      categories: categories,
    });
  },
];

const productEditUpdate = async (req, res) => {
  const id = parseInt(req.params.productId);
  const product = { ...req.body, category_id: parseInt(req.body.category_id) };

  await updateProduct({ id, ...product });

  res.redirect(`/view/products/${id}`);
};

module.exports = { productEditGet, productEditUpdate };
