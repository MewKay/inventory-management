const { param } = require("express-validator");

const categoryParamValidator = param("categoryId")
  .isInt()
  .withMessage("Invalid ID Type Value: Not an Integer")
  .bail()
  .toInt();

module.exports = categoryParamValidator;
