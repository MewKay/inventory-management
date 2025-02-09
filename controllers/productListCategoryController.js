const { matchedData } = require("express-validator");
const {
  getAllProductsByCategory,
  getAllCategories,
  getTotalProductsCountByCategory,
} = require("../db/queries");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");
const validateTableQueryParamsOld = require("../utils/validateTableQueryParams");
const validateTableQueryParams = require("../middlewares/validators/validateTableQueryParams");

const productsPerCategoryGet = [
  validateTableQueryParams,
  async (req, res) => {
    const { categoryId } = matchedData(req);
    const { sort, direction } = req.query;
    const totalProducts = await getTotalProductsCountByCategory(categoryId);
    const pagination = createPagination(req.query, totalProducts);

    const { columnToSortBy, sortDirection } = await validateTableQueryParamsOld(
      sort,
      direction,
    );

    const products = await getAllProductsByCategory(
      categoryId,
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
  },
];
module.exports = { productsPerCategoryGet };
