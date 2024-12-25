const express = require("express");
const app = express();

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on PORT : ${PORT}`);
});
