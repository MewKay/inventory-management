const validateTableQueryParams =
  async function validateQueryParametersToValidValues(sort, direction = "asc") {
    const validSortParams = ["name", "quantity", "price", "category"];
    const validDirections = ["ASC", "DESC"];

    const columnToSortBy = validSortParams.includes(sort) ? sort : "id";

    const upperCasedDirection = direction.toUpperCase();
    const sortDirection = validDirections.includes(upperCasedDirection)
      ? upperCasedDirection
      : "ASC";

    return {
      columnToSortBy,
      sortDirection,
    };
  };

module.exports = validateTableQueryParams;
