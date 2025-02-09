const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
const productListRouter = require("./routes/productListRouter");
const productListCategoryRouter = require("./routes/productListCategoryRouter");
const productDetailsRouter = require("./routes/productDetailsRouter");
const productEditRouter = require("./routes/productEditRouter");
app.use("/", indexRouter);
app.use("/view/products", productListRouter);
app.use("/view/category/:categoryId", productListCategoryRouter);
app.use("/view/products/:productId", productDetailsRouter);
app.use("/edit/products/:productId", productEditRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on PORT : ${PORT}`);
});
