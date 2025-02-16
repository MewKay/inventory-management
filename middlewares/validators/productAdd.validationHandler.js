const { validationResult, matchedData } = require("express-validator");
const { groupErrorsByField } = require("../../utils/validation.util");
const { getAllCategories } = require("../../db/queries");
const emptyProductFields = require("../../utils/constants/emptyProductFields");
const asyncHandler = require("express-async-handler");

const productAddValidationHandler = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsMessages = groupErrorsByField(errors.array());

  const validUserInputs = matchedData(req);
  const categories = await getAllCategories();

  return res.status(400).render("productAdd", {
    title: "Add New Product",
    product: { ...emptyProductFields, ...validUserInputs },
    categories: categories,
    errors: errorsMessages,
  });
});

module.exports = productAddValidationHandler;
