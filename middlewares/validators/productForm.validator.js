const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");

const { body } = new ExpressValidator(
  {
    isInCategoryIds: async (value) => {
      const categoryIds = (await getAllCategories()).map(
        (category) => category.id,
      );

      const isValueInCategoryIds = categoryIds.includes(value);
      if (!isValueInCategoryIds) {
        throw new Error("Category not found.");
      }
    },
  },
  {
    handleUncategorizedProduct: (value) => {
      return value === "" ? null : value;
    },
  },
);

const defaultLocale = "en-US";
const validSymbols = " .,-'()&/+:;";

const productFormValidator = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Name is required to be between 1 and 255 characters.")
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
    .isLength({ min: 1, max: 50 })
    .withMessage("Unit is required to be between 1 and 50 characters.")
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
