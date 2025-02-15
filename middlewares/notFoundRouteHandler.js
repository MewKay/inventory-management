const notFoundRouteHandler = (req, res) => {
  res.status(404).render("notFound404");
};

module.exports = notFoundRouteHandler;
