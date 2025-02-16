const asyncHandler = require("express-async-handler");
const { getAllCategoriesWithProductCount } = require("../db/queries");
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

module.exports = { categoryEditGet };
