#! usr/bin/env node
const { Client } = require("pg");

const query = `
  CREATE TABLE IF NOT EXISTS category(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(20) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS product(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    unit VARCHAR(15) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL
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
    ('Strawberries', 1, 25, 'kg', 3.99),
    ('Pineapple', 1, 12, 'each', 2.50),
    ('Mangoes', 1, 18, 'kg', 4.25),
    ('Tomatoes', 1, 50, 'kg', 1.99),
    ('Cucumbers', 1, 40, 'kg', 0.89),
    ('Lettuce', 1, 30, 'each', 1.25),
    ('Broccoli', 1, 20, 'kg', 2.75),

    ('Milk', 2, 60, 'liter', 3.49),
    ('Eggs', 2, 30, 'dozen', 2.99),
    ('Cheddar Cheese', 2, 25, 'kg', 8.99),
    ('Greek Yogurt', 2, 45, 'pack', 1.25),
    ('Butter', 2, 50, 'pack', 2.49),
    ('Cream Cheese', 2, 20, 'pack', 2.99),
    ('Mozzarella', 2, 30, 'kg', 6.75),
    ('Heavy Cream', 2, 20, 'pack', 3.99),
    ('Swiss Cheese', 2, 2, 'kg', 9.99),
    ('Buttermilk', 2, 30, 'liter', 2.50),
    ('Egg Substitute', 2, 40, 'pack', 4.25),

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
    ('Quinoa', 5, 60, 'kg', 4.50),
    ('Lentils', 5, 80, 'kg', 2.99),
    ('Canned Tomatoes', 5, 100, 'can', 1.25),
    ('Canned Beans', 5, 120, 'can', 1.35),
    ('Spaghetti', 5, 90, 'pack', 1.49),
    ('Oats', 5, 75, 'kg', 2.50),
    ('Cornmeal', 5, 50, 'kg', 1.99),
    ('Baking Powder', 5, 40, 'box', 3.25),
    ('Salt', 5, 100, 'pack', 0.99),

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
    ('Frozen Peas', 8, 40, 'kg', 1.99),

    ('Uncategorized Apples', NULL, 50, 'lbs', 1.99),
    ('Orphaned Widget', NULL, 100, 'pieces', 5.99),
    ('Mystery Tool', NULL, 20, 'units', 12.99),
    ('Generic Screwdriver', NULL, 75, 'units', 3.99),
    ('No-Category Flashlight', NULL, 30, 'pieces', 8.99);
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
