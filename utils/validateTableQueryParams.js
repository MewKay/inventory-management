const { getAllCategories } = require("../db/queries");

const validateTableQueryParams =
  async function validateQueryParametersToValidValues(
    sort,
    direction = "asc",
    categoryId = 1,
  ) {
    const validSortParams = ["name", "quantity", "price", "category"];
    const validDirections = ["ASC", "DESC"];
    const validCategoryId = (await getAllCategories()).map(
      (category) => category.id,
    );

    const columnToSortBy = validSortParams.includes(sort) ? sort : "id";

    const upperCasedDirection = direction.toUpperCase();
    const sortDirection = validDirections.includes(upperCasedDirection)
      ? upperCasedDirection
      : "ASC";

    const categoryToShow = validCategoryId.includes(categoryId)
      ? categoryId
      : 1;

    return {
      columnToSortBy,
      sortDirection,
      categoryToShow,
    };
  };

module.exports = validateTableQueryParams;
