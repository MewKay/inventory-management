const ranges = Object.freeze({
  product: {
    name: { min: 1, max: 50 },
    unit: { min: 1, max: 15 },
  },
  category: {
    name: { min: 1, max: 20 },
  },
});

module.exports = ranges;
