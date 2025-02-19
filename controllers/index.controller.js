const { matchedData } = require("express-validator");
const editProductSearchValidationHandler = require("../middlewares/validators/editProductSearch.validationHandler");
const editProductSearchValidator = require("../middlewares/validators/editProductSearch.validator");
const {
  getFirstProductIdLikeName,
  getTotalProductsCount,
  getTotalStockValue,
  getAllCategoriesWithProductCount,
} = require("../db/queries");
const asyncHandler = require("express-async-handler");
const NotFoundError = require("../errors/NotFoundError");

const homeGet = asyncHandler(async (req, res) => {
  const [totalProductsCount, totalStockValue, categories] = await Promise.all([
    getTotalProductsCount(),
    getTotalStockValue(),
    getAllCategoriesWithProductCount(),
  ]);

  if (!totalProductsCount || !totalStockValue || !categories) {
    throw new NotFoundError("Failed to fetch home data.");
  }

  res.render("index", {
    totalProductsCount: totalProductsCount,
    totalCategoriesCount: categories.length,
    totalStockValue: totalStockValue,
    categories: categories,
  });
});

const viewGet = (req, res) => {
  res.render("view");
};

const editGet = (req, res) => {
  res.render("edit");
};

const editProductPost = [
  editProductSearchValidator,
  editProductSearchValidationHandler,
  asyncHandler(async (req, res) => {
    const { name } = matchedData(req);
    const matchingProducts = await getFirstProductIdLikeName(name);

    if (matchingProducts.length <= 0) {
      return res.render("edit", {
        errors: [{ msg: "No product name matches your search" }],
      });
    }

    res.render("edit", { matchingProducts: matchingProducts });
  }),
];

module.exports = { homeGet, viewGet, editGet, editProductPost };
