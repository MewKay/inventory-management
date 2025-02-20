// eslint-disable-next-line no-unused-vars
const toggleForm = (button) => {
  const container = button.closest(".edit-product-container");
  const form = container.querySelector(".search-product");

  form.classList.toggle("hidden");
};
