const { validationResult } = require("express-validator");

const editProductSearchValidationHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.render("edit", { errors: errors.array() });
};

module.exports = editProductSearchValidationHandler;
