const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB(sort) {
  // Escape parameter before entering query
  const validParameters = ["name", "quantity", "price", "category"];
  const columnToSortBy = validParameters.includes(sort) ? sort : "id";

  const query = `
    SELECT p.id, p.name, quantity, unit, price, c.name AS category
    FROM product p
    INNER JOIN category c 
      ON p.category_id = c.id
    ORDER BY ${columnToSortBy};
    `;

  const { rows } = await pool.query(query);

  return rows;
};

module.exports = {
  getAllProducts,
};
