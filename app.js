const express = require("express");
const path = require("node:path");
const app = express();

const viewsPath = path.join(__dirname, "views");
const assetsPath = path.join(__dirname, "public");

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

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
