const { getAllProductsByCategory } = require("../db/queries");
const getCurrentColumnDirection = require("../utils/getCurrentColumnDirection");
const { createPagination } = require("../utils/pagination");

const productsPerCategoryGet = async (req, res) => {
  const { categoryId } = req.params;
  const { sort, direction } = req.query;
  const pagination = createPagination(req.query, 10); // TODO: Change 10 to the totalProducts inside a category

  const products = await getAllProductsByCategory(
    categoryId,
    sort,
    direction,
    pagination.productsPerPage,
    pagination.offset,
  );

  res.render("productListCategory", {
    products: products,
    pagination: pagination,
    nameDirection: getCurrentColumnDirection("name", sort, direction),
    quantityDirection: getCurrentColumnDirection("quantity", sort, direction),
    priceDirection: getCurrentColumnDirection("price", sort, direction),
    categoryDirection: getCurrentColumnDirection("category", sort, direction),
  });
};

module.exports = { productsPerCategoryGet };
