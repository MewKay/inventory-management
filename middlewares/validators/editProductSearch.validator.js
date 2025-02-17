const { body } = require("express-validator");

const defaultLocale = "en-US";
const validSymbols = " .,-'()&/+:;";

const editProductSearchValidator = body("name")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("Name is required to be between 1 and 255 characters.")
  .isAlphanumeric(defaultLocale, { ignore: validSymbols })
  .withMessage("Name have to be alphanumeric.");

module.exports = editProductSearchValidator;
