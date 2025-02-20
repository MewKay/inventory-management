const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");
const ValidationError = require("../../errors/ValidationError");
const ranges = require("../../utils/constants/inputRanges");
const defaultLocale = require("../../utils/constants/defaultLocale");
const {
  categoryName: validSymbols,
} = require("../../utils/constants/validSymbols");

const { body } = new ExpressValidator({
  isNotInCategories: async (value) => {
    const categoryNames = (await getAllCategories()).map(
      (category) => category.name,
    );

    if (categoryNames.includes(value)) {
      throw new ValidationError("Category name is already used");
    }
  },
});

const { min, max } = ranges.category.name;

const categoryFormValidator = body("name")
  .trim()
  .isLength({ min, max })
  .withMessage(`Category name is required to be between ${min} and ${max}`)
  .isAlpha(defaultLocale, { ignore: validSymbols })
  .withMessage(
    `Category name should only contains letters. Valid symbols are : ${validSymbols}`,
  )
  .bail()
  .isNotInCategories();

module.exports = categoryFormValidator;
