const { getAllProducts, getTotalProductsCount } = require("../db/queries");
const { createPagination } = require("../utils/pagination");

const getColumnDirection = function getColumnDirectionIfSortedBy(
  columnName,
  currentSort,
  currentDirection,
) {
  if (columnName !== currentSort) {
    return "";
  }

  if (currentDirection === "asc") {
    return "desc";
  }

  if (currentDirection === "desc") {
    return "asc";
  }
};

const productsGet = async (req, res) => {
  const { sort, direction } = req.query;
  const totalProducts = await getTotalProductsCount();
  const pagination = createPagination(req.query, totalProducts);

  const products = await getAllProducts(
    sort,
    direction,
    pagination.productsPerPage,
    pagination.offset,
  );

  res.render("productTable", {
    products: products,
    pagination: pagination,
    nameDirection: getColumnDirection("name", sort, direction),
    quantityDirection: getColumnDirection("quantity", sort, direction),
    priceDirection: getColumnDirection("price", sort, direction),
    categoryDirection: getColumnDirection("category", sort, direction),
  });
};

module.exports = { productsGet };
