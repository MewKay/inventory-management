const { param } = require("express-validator");

const productParamValidator = param("productId")
  .isInt()
  .withMessage("Invalid ID Type Value: Not an Integer")
  .bail()
  .toInt();

module.exports = productParamValidator;
