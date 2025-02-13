const { getAllProducts, getTotalProductsCount } = require("../db/queries");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");
const validateTableQueryParams = require("../middlewares/validators/tableQueryParams.validator");
const { matchedData } = require("express-validator");

const productsGet = [
  validateTableQueryParams,
  async (req, res) => {
    const { sort, direction } = matchedData(req);
    const totalProducts = await getTotalProductsCount();
    const pagination = createPagination(req.query, totalProducts);

    const products = await getAllProducts(
      sort,
      direction,
      pagination.productsPerPage,
      pagination.offset,
    );

    res.render("productList", {
      products: products,
      pagination: pagination,
      nameDirection: getCurrentColumnDirection("name", sort, direction),
      quantityDirection: getCurrentColumnDirection("quantity", sort, direction),
      priceDirection: getCurrentColumnDirection("price", sort, direction),
      categoryDirection: getCurrentColumnDirection("category", sort, direction),
    });
  },
];

module.exports = { productsGet };
