const { getAllProducts } = require("../db/queries");

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
  const products = await getAllProducts(sort, direction);

  res.render("productTable", {
    products: products,
    nameDirection: getColumnDirection("name", sort, direction),
    quantityDirection: getColumnDirection("quantity", sort, direction),
    priceDirection: getColumnDirection("price", sort, direction),
    categoryDirection: getColumnDirection("category", sort, direction),
  });
};

module.exports = { productsGet };
