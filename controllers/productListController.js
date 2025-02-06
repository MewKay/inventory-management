const { getAllProducts, getTotalProductsCount } = require("../db/queries");
const validateTableQueryParams = require("../utils/validateTableQueryParams");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");

const productsGet = async (req, res) => {
  const { sort, direction } = req.query;
  const totalProducts = await getTotalProductsCount();
  const pagination = createPagination(req.query, totalProducts);

  const { columnToSortBy, sortDirection } = await validateTableQueryParams(
    sort,
    direction,
  );

  const products = await getAllProducts(
    columnToSortBy,
    sortDirection,
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
};

module.exports = { productsGet };
