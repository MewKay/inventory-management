const getCurrentColumnDirection = function getColumnDirectionIfSortedBy(
  columnName,
  currentSort,
  currentDirection,
) {
  if (columnName !== currentSort) {
    return "";
  }

  if (currentDirection === "asc") {
    return "desc";
  }

  if (currentDirection === "desc") {
    return "asc";
  }
};

module.exports = getCurrentColumnDirection;
