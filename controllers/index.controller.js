const editProductSearchValidationHandler = require("../middlewares/validators/editProductSearch.validationHandler");
const editProductSearchValidator = require("../middlewares/validators/editProductSearch.validator");

const viewGet = (req, res) => {
  res.render("view");
};

const editGet = (req, res) => {
  res.render("edit", { errors: [] }); // Pass in no-error array to avoid ReferenceError
};

const editProductPost = [
  editProductSearchValidator,
  editProductSearchValidationHandler,
];

module.exports = { viewGet, editGet, editProductPost };
