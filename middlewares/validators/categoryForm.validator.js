const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");
const ValidationError = require("../../errors/ValidationError");

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

const defaultLocale = "en-US";
const validSymbols = " .-&";

const categoryFormValidator = body("name")
  .trim()
  .isLength({ min: 1, max: 255 })
  .withMessage("Category name is required to be between 1 and 255")
  .isAlpha(defaultLocale, { ignore: validSymbols })
  .withMessage(
    `Category name should only contains letters. Valid symbols are : ${validSymbols}`,
  )
  .bail()
  .isNotInCategories();

module.exports = categoryFormValidator;
