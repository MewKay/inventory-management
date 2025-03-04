const { validationResult, matchedData } = require("express-validator");
const { getProductDetails, getAllCategories } = require("../../db/queries");
const { groupErrorsByField } = require("../../utils/validation.util");
const asyncHandler = require("express-async-handler");

const productUpdateValidationHandler = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsMessages = groupErrorsByField(errors.array());

  if (errorsMessages.productId) {
    return res.status(400).send(errorsMessages.productId);
  }

  const { productId, ...validUserInputs } = matchedData(req);

  const [product, categories] = await Promise.all([
    getProductDetails(productId),
    getAllCategories(),
  ]);

  return res.status(400).render("productEdit", {
    title: "Edit Product",
    product: {
      ...product,
      ...validUserInputs,
    },
    categories: categories,
    errors: errorsMessages,
  });
});

module.exports = productUpdateValidationHandler;
