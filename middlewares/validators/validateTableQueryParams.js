const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");

const { param } = new ExpressValidator(
  {
    isCategoriesNotEmpty: async () => {
      const categoryIds = (await getAllCategories()).map(
        (category) => category.id,
      );

      if (!categoryIds) {
        throw new Error("There is no categories yet.");
      }
    },
  },
  {
    defaultCategoryIdIfInvalid: async (value) => {
      const categoryId = parseInt(value);
      const DEFAULT_ID = 1;
      const categoryIds = (await getAllCategories()).map(
        (category) => category.id,
      );

      return categoryIds.includes(categoryId) ? categoryId : DEFAULT_ID;
    },
  },
);

const validateTableQueryParams = [
  param("categoryId")
    .optional()
    .isCategoriesNotEmpty()
    .bail()
    .defaultCategoryIdIfInvalid(),
];

module.exports = validateTableQueryParams;
