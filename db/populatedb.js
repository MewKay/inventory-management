#! usr/bin/env node
const { Client } = require("pg");

const query = `
  CREATE TABLE IF NOT EXISTS category(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS product(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    quantity INTEGER,
    unit VARCHAR(50),
    price DECIMAL(10,2),
    category_id INTEGER REFERENCES category(id)
  );

  INSERT INTO category(name) 
  VALUES 
    ('Fruits & Vegetables'),
    ('Dairy & Eggs'),
    ('Bakery'),
    ('Meat & Seafood'),
    ('Pantry Staples'),
    ('Beverages'),
    ('Snacks'),
    ('Frozen Foods')
  ;

  INSERT INTO product (name, category_id, quantity, unit, price) 
  VALUES
    ('Apples', 1, 50, 'kg', 2.99),
    ('Bananas', 1, 120, 'bunch', 1.50),
    ('Oranges', 1, 80, 'kg', 3.20),
    ('Grapes', 1, 35, 'kg', 4.99),
    ('Carrots', 1, 75, 'kg', 1.49),
    ('Potatoes', 1, 90, 'kg', 1.99),
    ('Spinach', 1, 40, 'bunch', 2.50),
    ('Bell Peppers', 1, 60, 'each', 0.75),

    ('Milk', 2, 60, 'liter', 3.49),
    ('Eggs', 2, 30, 'dozen', 2.99),
    ('Cheddar Cheese', 2, 25, 'kg', 8.99),
    ('Greek Yogurt', 2, 45, 'pack', 1.25),
    ('Butter', 2, 50, 'pack', 2.49),
    ('Cream Cheese', 2, 20, 'pack', 2.99),
    ('Mozzarella', 2, 30, 'kg', 6.75),

    ('Sourdough Bread', 3, 40, 'each', 4.99),
    ('Baguette', 3, 35, 'each', 3.25),
    ('Croissants', 3, 50, 'pack', 5.99),
    ('Chocolate Cookies', 3, 35, 'pack', 3.99),
    ('Blueberry Muffins', 3, 25, 'pack', 4.50),
    ('Cinnamon Rolls', 3, 30, 'pack', 3.75),

    ('Chicken Breast', 4, 45, 'kg', 6.99),
    ('Salmon Fillet', 4, 20, 'kg', 12.99),
    ('Ground Beef', 4, 55, 'kg', 7.49),
    ('Pork Chops', 4, 30, 'kg', 8.25),
    ('Shrimp', 4, 25, 'kg', 14.99),
    ('Turkey Breast', 4, 35, 'kg', 9.99),

    ('Rice', 5, 100, 'kg', 1.99),
    ('Pasta', 5, 80, 'pack', 1.49),
    ('Olive Oil', 5, 55, 'liter', 7.99),
    ('White Sugar', 5, 90, 'kg', 1.20),
    ('All-Purpose Flour', 5, 70, 'kg', 1.75),
    ('Honey', 5, 40, 'jar', 5.50),
    ('Soy Sauce', 5, 60, 'liter', 2.99),

    ('Mineral Water', 6, 200, 'bottle', 0.99),
    ('Orange Juice', 6, 70, 'carton', 3.49),
    ('Coffee Beans', 6, 45, 'kg', 12.99),
    ('Green Tea', 6, 85, 'box', 4.25),
    ('Cola', 6, 150, 'can', 0.75),
    ('Apple Juice', 6, 65, 'carton', 2.99),

    ('Potato Chips', 7, 75, 'bag', 2.99),
    ('Trail Mix', 7, 40, 'pack', 3.50),
    ('Popcorn', 7, 60, 'pack', 1.99),
    ('Dark Chocolate', 7, 50, 'bar', 2.25),
    ('Candy Bars', 7, 100, 'each', 1.50),

    ('Frozen Pizza', 8, 30, 'each', 6.99),
    ('Ice Cream', 8, 45, 'liter', 4.99),
    ('Frozen Berries', 8, 25, 'kg', 3.75),
    ('Frozen Peas', 8, 40, 'kg', 1.99);
`;

//Url can be passed as the first argument of the script
const DATABASE_URL = process.argv[2];

const main = async () => {
  console.log("seeding...");
  let client;

  try {
    client = new Client({
      connectionString: DATABASE_URL,
    });

    await client.connect();
    await client.query(query);

    console.log("done");
  } catch (e) {
    console.error(e);
  } finally {
    if (client) await client.end();
  }
};

main();
