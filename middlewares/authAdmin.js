require("dotenv").config();

const authAdmin = (req, res, next) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    throw new Error("The password provided is invalid.");
  }

  next();
};

module.exports = authAdmin;
