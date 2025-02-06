const {
  getAllProductsByCategory,
  getAllCategories,
  getTotalProductsCountByCategory,
} = require("../db/queries");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");
const validateTableQueryParams = require("../utils/validateTableQueryParams");

const productsPerCategoryGet = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const { sort, direction } = req.query;
  const totalProducts = await getTotalProductsCountByCategory(categoryId);
  const pagination = createPagination(req.query, totalProducts);

  const { columnToSortBy, sortDirection, categoryToShow } =
    await validateTableQueryParams(sort, direction, categoryId);

  const products = await getAllProductsByCategory(
    categoryToShow,
    columnToSortBy,
    sortDirection,
    pagination.productsPerPage,
    pagination.offset,
  );

  const categories = await getAllCategories();

  res.render("productListCategory", {
    products: products,
    categories: categories,
    pagination: pagination,
    nameDirection: getCurrentColumnDirection("name", sort, direction),
    quantityDirection: getCurrentColumnDirection("quantity", sort, direction),
    priceDirection: getCurrentColumnDirection("price", sort, direction),
    categoryDirection: getCurrentColumnDirection("category", sort, direction),
  });
};

module.exports = { productsPerCategoryGet };
