/* eslint-disable no-unused-vars */
const toggleForm = (button) => {
  const categoryCard = button.closest(".category-card-container");
  const displayName = categoryCard.querySelector(".display-name");
  const editName = categoryCard.querySelector(".edit-name");

  displayName.classList.toggle("hidden");
  editName.classList.toggle("hidden");
};

const addToggleForm = (button) => {
  const addContainer = button.closest(".add-category-container");
  const buttonNewCategory = addContainer.querySelector(
    ".button-toggle-new-category",
  );
  const formNewCategory = addContainer.querySelector(".new-category-form");

  buttonNewCategory.classList.toggle("hidden");
  formNewCategory.classList.toggle("hidden");
};
