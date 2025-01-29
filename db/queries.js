const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB(
  sort,
  direction = "ASC",
  productsPerPage,
  offset,
) {
  // Escape parameters before entering query
  const validParameters = ["name", "quantity", "price", "category"];
  const columnToSortBy = validParameters.includes(sort) ? sort : "id";

  const validDirections = ["ASC", "DESC"];
  const upperCasedDirection = direction.toUpperCase();
  const sortDirection = validDirections.includes(upperCasedDirection)
    ? upperCasedDirection
    : "ASC";

  const query = `
    SELECT p.id, p.name, quantity, unit, price, c.name AS category
    FROM product p
    INNER JOIN category c 
      ON p.category_id = c.id
    ORDER BY ${columnToSortBy} ${sortDirection}
    LIMIT $1 OFFSET $2;
    `;
  const values = [productsPerPage, offset];

  const { rows } = await pool.query(query, values);

  return rows;
};

const getTotalProductsCount = async function queryTotalProductsCountFromDB() {
  const query = `
    SELECT COUNT(*)
    FROM product;
  `;

  const { rows } = await pool.query(query);
  return rows[0].count;
};

const getProductDetails = async function queryProductDataByIdFromDB(productId) {
  const query = `
    SELECT p.id, p.name, quantity, unit, price, c.name AS category, 
      quantity * price AS total_stock_price
    FROM product p
    INNER JOIN category c 
      ON p.category_id = c.id
    WHERE p.id = $1;
  `;
  const values = [productId];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  getAllProducts,
  getTotalProductsCount,
  getProductDetails,
};
