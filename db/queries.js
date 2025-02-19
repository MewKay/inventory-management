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

const getAllCategoriesWithProductCount =
  async function queryAllCategoriesWithProductCountFromDB() {
    const query = `
      SELECT c.id, c.name, 
      COUNT(p.category_id) AS products_count
      FROM category c
      LEFT JOIN product p 
        ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.id;
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

const getTotalProductsCountByCategory =
  async function queryTotalProductsCountWithCategoryIdFromDB(categoryId) {
    const query = `
      SELECT COUNT(*)
      FROM product p
      INNER JOIN category c 
        ON p.category_id = c.id
      WHERE c.id = $1;
    `;
    const values = [categoryId];

    const { rows } = await pool.query(query, values);
    return rows[0].count;
  };

const getProductDetails = async function queryProductDataByIdFromDB(productId) {
  const query = `
    SELECT p.id, p.name, quantity, unit, price, c.name AS category, 
      p.category_id, quantity * price AS total_stock_price
    FROM product p
    LEFT JOIN category c 
      ON p.category_id = c.id
    WHERE p.id = $1;
  `;
  const values = [productId];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateProduct = async function updateProductDataInDB(product) {
  const query = `
    UPDATE product
    SET 
      name = $1,
      quantity = $2,
      unit = $3,
      price = $4,
      category_id = $5
    WHERE id = $6;
  `;
  const values = [
    product.name,
    product.quantity,
    product.unit,
    product.price,
    product.category_id,
    product.id,
  ];

  const result = await pool.query(query, values);
  return result;
};

const deleteProduct = async function deleteProductWithIdFromDB(productId) {
  const query = `
    DELETE 
    FROM product
    WHERE id = $1;
  `;
  const values = [productId];

  const result = await pool.query(query, values);
  return result;
};

const addProduct = async function addProductAndReturnItsIdToDB(product) {
  const query = `
    INSERT INTO product
      (name, category_id, quantity, unit, price)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  const values = [
    product.name,
    product.category_id,
    product.quantity,
    product.unit,
    product.price,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

const updateCategory = async function updateCategoryDataInDB(category) {
  const query = `
    UPDATE category
    SET 
      name = $1
    WHERE id = $2;
  `;
  const values = [category.name, category.id];

  const result = await pool.query(query, values);
  return result;
};

const deleteCategory = async function deleteCategoryWithIdFromDB(categoryId) {
  const query = `
    DELETE 
    FROM category
    WHERE id = $1;
  `;
  const values = [categoryId];

  const result = await pool.query(query, values);
  return result;
};

const addCategory = async function addCategoryToDB(categoryName) {
  const query = `
    INSERT INTO category(name)
    VALUES ($1);
  `;
  const values = [categoryName];

  const result = await pool.query(query, values);
  return result;
};

const getFirstProductIdLikeName = async function queryProductIdLikeNameFromDB(
  productName,
) {
  const query = `
    SELECT id, name
    FROM product
    WHERE name ILIKE $1
    ORDER BY name;
  `;
  const values = ["%" + productName + "%"];

  const { rows } = await pool.query(query, values);
  return rows;
};

const getTotalStockValue = async function queryTotalStockValue() {
  const query = `
    SELECT SUM(quantity * price) AS value
    FROM product;
  `;

  const { rows } = await pool.query(query);
  return rows[0].value;
};

module.exports = {
  getAllProducts,
  getAllCategories,
  getAllCategoriesWithProductCount,
  getAllProductsByCategory,
  getTotalProductsCount,
  getTotalProductsCountByCategory,
  getProductDetails,
  updateProduct,
  deleteProduct,
  addProduct,
  updateCategory,
  deleteCategory,
  addCategory,
  getFirstProductIdLikeName,
  getTotalStockValue,
};
