const asyncHandler = require("express-async-handler");
const {
  getAllCategoriesWithProductCount,
  updateCategory,
} = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");

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
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const result = await updateCategory({ id: categoryId, name: name });

    if (result.rowCount <= 0) {
      throw new NotFoundError("Failed to update category.");
    }

    res.redirect("/edit/category");
  }),
];

module.exports = { categoryEditGet, categoryEditUpdate };
