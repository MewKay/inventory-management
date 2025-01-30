const { escapeTableQueryParams } = require("../utils/db");
const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB(
  sort,
  direction,
  productsPerPage,
  offset,
) {
  const { columnToSortBy, sortDirection } = escapeTableQueryParams(
    sort,
    direction,
  );

  const query = `
    SELECT p.id, p.name, quantity, unit, price,
    CASE 
      WHEN c.name IS NULL THEN 'Uncategorized'
      ELSE c.name
    END AS category
    FROM product p
    LEFT JOIN category c 
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

module.exports = {
  getAllProducts,
  getTotalProductsCount,
};
