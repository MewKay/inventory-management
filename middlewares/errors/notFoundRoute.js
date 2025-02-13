const notFoundRoute = (req, res) => {
  res.status(404).send("404 You are lost.");
};

module.exports = notFoundRoute;
