const pool = require("./pool");

const getAllProducts = async function queryAllProductsDataFromDB(
  sort,
  direction,
  productsPerPage,
  offset,
) {
  const query = `
    SELECT p.id, p.name, quantity, unit, price,
    CASE 
      WHEN c.name IS NULL THEN 'Uncategorized'
      ELSE c.name
    END AS category
    FROM product p
    LEFT JOIN category c 
      ON p.category_id = c.id
    ORDER BY ${sort} ${direction}
    LIMIT $1 OFFSET $2;
    `;
  const values = [productsPerPage, offset];

  const { rows } = await pool.query(query, values);

  return rows;
};

const getAllCategories = async function queryAllCategoriesFromDB() {
  const query = `
    SELECT *
    FROM category;
  `;

  const { rows } = await pool.query(query);
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

const getAllProductsByCategory =
  async function queryAllProductsDataWithCategoryIdFromDB(
    categoryId,
    sort,
    direction,
    productsPerPage,
    offset,
  ) {
    const query = `
      SELECT p.id, p.name, quantity, unit, price, c.name AS category
      FROM product p
      INNER JOIN category c 
        ON p.category_id = c.id
      WHERE c.id = $1
      ORDER BY ${sort} ${direction}
      LIMIT $2 OFFSET $3;
    `;
    const values = [categoryId, productsPerPage, offset];

    const { rows } = await pool.query(query, values);

    return rows;
  };

module.exports = {
  getAllProducts,
  getAllCategories,
  getAllProductsByCategory,
  getTotalProductsCount,
};
