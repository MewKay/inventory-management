const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/index.router");
const productListRouter = require("./routes/productList.router");
const productListCategoryRouter = require("./routes/productListCategory.router");
const productDetailsRouter = require("./routes/productDetails.router");
const productEditRouter = require("./routes/productEdit.router");
const productAddRouter = require("./routes/productAdd.router");
const notFoundRouteHandler = require("./middlewares/notFoundRouteHandler");
const errorHandler = require("./middlewares/errorHandler");
const categoryEditRouter = require("./routes/categoryEdit.router");
app.use("/", indexRouter);
app.use("/view/products", productListRouter);
app.use("/view/products/:productId", productDetailsRouter);
app.use("/view/category/:categoryId", productListCategoryRouter);
app.use("/edit/products/new", productAddRouter);
app.use("/edit/products/:productId", productEditRouter);
app.use("/edit/category", categoryEditRouter);

app.use(notFoundRouteHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on PORT : ${PORT}`);
});
