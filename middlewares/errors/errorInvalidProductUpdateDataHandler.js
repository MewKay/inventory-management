const { validationResult, matchedData } = require("express-validator");
const { getProductDetails, getAllCategories } = require("../../db/queries");
const { groupErrorsByField } = require("../../utils/errors");

const errorInvalidProductUpdateDataHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsMessages = groupErrorsByField(errors.array());

  if (errorsMessages.productId) {
    return res.status(400).send(errorsMessages.productId);
  }

  const { productId, ...validUserInputs } = matchedData(req);

  const { name, quantity, unit, price, category } =
    await getProductDetails(productId);
  const categories = await getAllCategories();

  // Change product's property 'category' to its 'category_id' counterpart
  // to match the structure of 'validUserInputs'.
  // Will be overwritten by 'category_id' in 'validUserInputs' when passed to view.
  const category_id = categories.find(
    (categoryRow) => categoryRow.name === category,
  );

  return res.status(400).render("productEdit", {
    title: "Edit Product",
    product: { name, quantity, unit, price, category_id, ...validUserInputs },
    categories: categories,
    errors: errorsMessages,
  });
};

module.exports = errorInvalidProductUpdateDataHandler;
