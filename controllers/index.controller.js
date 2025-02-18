const { matchedData } = require("express-validator");
const editProductSearchValidationHandler = require("../middlewares/validators/editProductSearch.validationHandler");
const editProductSearchValidator = require("../middlewares/validators/editProductSearch.validator");
const { getFirstProductIdLikeName } = require("../db/queries");

const viewGet = (req, res) => {
  res.render("view");
};

const editGet = (req, res) => {
  res.render("edit");
};

const editProductPost = [
  editProductSearchValidator,
  editProductSearchValidationHandler,
  async (req, res) => {
    const { name } = matchedData(req);
    const matchingProducts = await getFirstProductIdLikeName(name);

    if (matchingProducts.length <= 0) {
      return res.render("edit", {
        errors: [{ msg: "No product name matches your search" }],
      });
    }

    res.render("edit", { matchingProducts: matchingProducts });
  },
];

module.exports = { viewGet, editGet, editProductPost };
