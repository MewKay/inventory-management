const asyncHandler = require("express-async-handler");
const {
  getAllCategoriesWithProductCount,
  updateCategory,
  deleteCategory,
  addCategory,
} = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");
const categoryParamValidator = require("../middlewares/validators/categoryParam.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");
const { matchedData } = require("express-validator");
const categoryFormValidator = require("../middlewares/validators/categoryForm.validator");
const categoryFormValidationHandler = require("../middlewares/validators/categoryForm.validationHandler");
const authAdmin = require("../middlewares/authAdmin");

const categoryEditGet = asyncHandler(async (req, res) => {
  const categories = await getAllCategoriesWithProductCount();

  if (!categories) {
    throw new NotFoundError("Failed to fetch categories");
  }

  res.render("categoryEdit", {
    title: "Manage Categories",
    categories: categories,
  });
});

const categoryEditUpdate = [
  authAdmin,
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
  authAdmin,
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

const categoryEditAdd = [
  authAdmin,
  categoryFormValidator,
  categoryFormValidationHandler,
  asyncHandler(async (req, res) => {
    const { name } = matchedData(req);

    const result = await addCategory(name);

    if (result.rowCount <= 0) {
      throw new NotFoundError("Failed to add new category.");
    }

    res.redirect("/edit/category");
  }),
];

module.exports = {
  categoryEditGet,
  categoryEditUpdate,
  categoryEditDelete,
  categoryEditAdd,
};
