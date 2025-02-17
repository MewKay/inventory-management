const viewGet = (req, res) => {
  res.render("view");
};

const editGet = (req, res) => {
  res.render("edit");
};

module.exports = { viewGet, editGet };
