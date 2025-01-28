const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB(
  sort,
  direction = "ASC",
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
    ORDER BY ${columnToSortBy} ${sortDirection};
    `;

  const { rows } = await pool.query(query);

  return rows;
};

module.exports = {
  getAllProducts,
};
