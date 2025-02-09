const { ExpressValidator } = require("express-validator");
const { getAllCategories } = require("../../db/queries");

const { param, query } = new ExpressValidator(
  {
    isCategoriesNotEmpty: async () => {
      const categoryIds = (await getAllCategories()).map(
        (category) => category.id,
      );

      if (categoryIds.length <= 0) {
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
    defaultSortIfInvalid: (value) => {
      const sortColumns = ["name", "quantity", "price", "category"];
      const DEFAULT_SORT = "id";

      return sortColumns.includes(value) ? value : DEFAULT_SORT;
    },
    defaultDirectionIfInvalid: (value) => {
      const directions = ["ASC", "DESC"];
      const DEFAULT_DIRECTION = directions[0];

      return directions.includes(value) ? value : DEFAULT_DIRECTION;
    },
  },
);

const validateTableQueryParams = [
  param("categoryId")
    .optional()
    .isCategoriesNotEmpty()
    .bail()
    .defaultCategoryIdIfInvalid(),
  query("sort").defaultSortIfInvalid(),
  query("direction").toUpperCase().defaultDirectionIfInvalid(),
];

module.exports = validateTableQueryParams;
