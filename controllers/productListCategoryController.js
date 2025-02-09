const { matchedData, validationResult } = require("express-validator");
const {
  getAllProductsByCategory,
  getAllCategories,
  getTotalProductsCountByCategory,
} = require("../db/queries");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");
const validateTableQueryParams = require("../middlewares/validators/validateTableQueryParams");

const productsPerCategoryGet = [
  validateTableQueryParams,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

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
