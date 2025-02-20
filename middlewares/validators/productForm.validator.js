const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");
const ValidationError = require("../../errors/ValidationError");
const defaultLocale = require("../../utils/constants/defaultLocale");
const {
  productName: validSymbols,
} = require("../../utils/constants/validSymbols");
const ranges = require("../../utils/constants/inputRanges");

const { body } = new ExpressValidator(
  {
    isInCategoryIds: async (value) => {
      const categoryIds = (await getAllCategories()).map(
        (category) => category.id,
      );

      const isValueInCategoryIds = categoryIds.includes(value);
      if (!isValueInCategoryIds) {
        throw new ValidationError("Category not found.");
      }
    },
  },
  {
    handleUncategorizedProduct: (value) => {
      return value === "" ? null : value;
    },
  },
);

const { min: minName, max: maxName } = ranges.product.name;
const { min: minUnit, max: maxUnit } = ranges.product.unit;

const productFormValidator = [
  body("name")
    .trim()
    .isLength({ min: minName, max: maxName })
    .withMessage(
      `Name is required to be between ${minName} and ${maxName} characters.`,
    )
    .isAlphanumeric(defaultLocale, { ignore: validSymbols })
    .withMessage("Name have to be alphanumeric."),

  body("category_id")
    .handleUncategorizedProduct()
    .optional({ values: "null" })
    .isInt()
    .withMessage("Invalid Category id Value.")
    .bail()
    .toInt()
    .isInCategoryIds(),

  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity must not be empty.")
    .isInt({ min: 0 })
    .withMessage("Quantity have to be a non-negative integer."),

  body("unit")
    .trim()
    .isLength({ min: minUnit, max: maxUnit })
    .withMessage(
      `Unit is required to be between ${minUnit} and ${maxUnit} characters.`,
    )
    .isAlpha()
    .withMessage("Unit must only contains characters."),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price must not be empty.")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number.")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage(
      "Price must be a decimal number with at most 2 decimal places.",
    ),
];

module.exports = productFormValidator;
