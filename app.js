const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/indexRouter");
const productListRouter = require("./routes/productListRouter");
const productListCategoryRouter = require("./routes/productListCategoryRouter");
app.use("/", indexRouter);
app.use("/view/products", productListRouter);
app.use("/view/category", productListCategoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on PORT : ${PORT}`);
});
