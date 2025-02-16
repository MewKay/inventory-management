const asyncHandler = require("express-async-handler");
const {
  getAllCategoriesWithProductCount,
  updateCategory,
  deleteCategory,
} = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");
const categoryParamValidator = require("../middlewares/validators/categoryParam.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");
const { matchedData } = require("express-validator");
const categoryFormValidator = require("../middlewares/validators/categoryForm.validator");
const categoryFormValidationHandler = require("../middlewares/validators/categoryForm.validationHandler");

const categoryEditGet = asyncHandler(async (req, res) => {
  const categories = await getAllCategoriesWithProductCount();

  if (!categories) {
    throw new NotFoundError("Failed to fetch categories");
  }

  res.render("categoryEdit", {
    title: "Manage Categories",
    categories: categories,
    errors: [], // Pass in no-error array to avoid ReferenceError
  });
});

const categoryEditUpdate = [
  categoryParamValidator,
  paramValidationHandler,
  categoryFormValidator,
  categoryFormValidationHandler,
  asyncHandler(async (req, res) => {
    const { categoryId: id, name } = matchedData(req);

    const result = await updateCategory({ id, name });

    if (result.rowCount <= 0) {
      throw new NotFoundError("Failed to update category.");
    }

    res.redirect("/edit/category");
  }),
];

const categoryEditDelete = [
  categoryParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { categoryId } = matchedData(req);

    const result = await deleteCategory(categoryId);

    if (result.rowCount <= 0) {
      throw new NotFoundError("Failed to delete category.");
    }

    res.redirect("/edit/category");
  }),
];

module.exports = { categoryEditGet, categoryEditUpdate, categoryEditDelete };
