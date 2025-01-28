const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB() {
  const query = `
    SELECT p.id, p.name, quantity, unit, price, c.name AS category
    FROM product p
    INNER JOIN category c 
      ON p.category_id = c.id;
    `;

  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  getAllProducts,
};
