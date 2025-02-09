const { ExpressValidator } = require("express-validator");
const { getProductDetails } = require("../../db/queries");

const { param } = new ExpressValidator({
  isProductExisting: async (value) => {
    const product = await getProductDetails(value);

    if (!product) {
      throw new Error("Product not found");
    }
  },
});

const validateProductParam = param("productId")
  .isInt()
  .withMessage("Invalid ID Type Value: Not an Integer")
  .bail()
  .toInt()
  .isProductExisting();

module.exports = validateProductParam;
