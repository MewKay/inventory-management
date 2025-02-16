const asyncHandler = require("express-async-handler");
const {
  getAllCategoriesWithProductCount,
  updateCategory,
} = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");
const categoryParamValidator = require("../middlewares/validators/categoryParam.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");
const { matchedData } = require("express-validator");

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
  categoryParamValidator,
  paramValidationHandler,
  asyncHandler(async (req, res) => {
    const { categoryId } = matchedData(req);
    const { name } = req.body;

    const result = await updateCategory({ id: categoryId, name: name });

    if (result.rowCount <= 0) {
      throw new NotFoundError("Failed to update category.");
    }

    res.redirect("/edit/category");
  }),
];

module.exports = { categoryEditGet, categoryEditUpdate };
