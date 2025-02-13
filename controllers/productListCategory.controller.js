const { matchedData } = require("express-validator");
const {
  getAllProductsByCategory,
  getAllCategories,
  getTotalProductsCountByCategory,
} = require("../db/queries");
const { getCurrentColumnDirection } = require("../utils/controller.util");
const { createPagination } = require("../utils/pagination");
const validateTableQueryParams = require("../middlewares/validators/tableQueryParams.validator");
const paramValidationHandler = require("../middlewares/validators/param.validationHandler");

const productsPerCategoryGet = [
  validateTableQueryParams,
  paramValidationHandler,
  async (req, res) => {
    const { categoryId, sort, direction } = matchedData(req);
    const totalProducts = await getTotalProductsCountByCategory(categoryId);
    const pagination = createPagination(req.query, totalProducts);

    const products = await getAllProductsByCategory(
      categoryId,
      sort,
      direction,
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
