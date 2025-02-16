const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { getAllCategoriesWithProductCount } = require("../../db/queries");

const categoryFormValidationHandler = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const categories = await getAllCategoriesWithProductCount();

  res.render("categoryEdit", {
    title: "Manage Categories",
    categories: categories,
    errors: errors.array(),
  });
});

module.exports = categoryFormValidationHandler;
