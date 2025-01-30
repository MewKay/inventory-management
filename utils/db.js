const escapeTableQueryParams = function escapeQueryParametersToValidValues(
  sort,
  direction = "asc",
) {
  const validParameters = ["name", "quantity", "price", "category"];
  const validDirections = ["ASC", "DESC"];

  const columnToSortBy = validParameters.includes(sort) ? sort : "id";

  const upperCasedDirection = direction.toUpperCase();
  const sortDirection = validDirections.includes(upperCasedDirection)
    ? upperCasedDirection
    : "ASC";

  return {
    columnToSortBy,
    sortDirection,
  };
};

module.exports = { escapeTableQueryParams };
