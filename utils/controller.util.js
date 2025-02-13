const getCurrentColumnDirection = function getColumnDirectionIfSortedBy(
  columnName,
  currentSort,
  currentDirection,
) {
  if (columnName !== currentSort) {
    return "";
  }

  if (currentDirection === "ASC") {
    return "desc";
  }

  if (currentDirection === "DESC") {
    return "asc";
  }
};

module.exports = { getCurrentColumnDirection };
