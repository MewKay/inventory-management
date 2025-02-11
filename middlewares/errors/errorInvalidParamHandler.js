const { validationResult } = require("express-validator");

const errorInvalidParamHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const paramError = errors
    .array()
    .find((error) => error.location === "params");

  return res.status(400).send(paramError.msg);
};

module.exports = errorInvalidParamHandler;
