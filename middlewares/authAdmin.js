const ValidationError = require("../errors/ValidationError");
require("dotenv").config();

const authAdmin = (req, res, next) => {
  const { password } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    throw new ValidationError("The password provided is invalid.");
  }

  next();
};

module.exports = authAdmin;
