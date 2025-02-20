const { body } = require("express-validator");
const defaultLocale = require("../../utils/constants/defaultLocale");
const {
  productName: validSymbols,
} = require("../../utils/constants/validSymbols");
const ranges = require("../../utils/constants/inputRanges");

const { min, max } = ranges.product.name;

const editProductSearchValidator = body("name")
  .trim()
  .isLength({ min, max })
  .withMessage(`Name is required to be between ${min} and ${max} characters.`)
  .isAlphanumeric(defaultLocale, { ignore: validSymbols })
  .withMessage("Name have to be alphanumeric.");

module.exports = editProductSearchValidator;
