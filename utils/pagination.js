const createPagination = function paginationFactory(
  queryParams,
  totalProducts,
) {
  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage) || 1;

  const rawPage = parseInt(queryParams.page) || 1;

  // Clamp page to valid range (1 <= currentPage <= totalPages)
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);
  const offset = (currentPage - 1) * productsPerPage;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const getPreviousPageLink =
    function getLinkToPreviousPageRetainingBaseURLParams() {
      const baseURLParams = new URLSearchParams(queryParams);
      baseURLParams.set("page", currentPage - 1);
      return "?" + baseURLParams;
    };

  const getNextPageLink = function getLinkToNextPageRetainingBaseURLParams() {
    const baseURLParams = new URLSearchParams(queryParams);
    baseURLParams.set("page", currentPage + 1);
    return "?" + baseURLParams;
  };

  return {
    productsPerPage,
    currentPage,
    totalPages,
    offset,
    hasPreviousPage,
    hasNextPage,
    getPreviousPageLink,
    getNextPageLink,
  };
};

module.exports = { createPagination };
