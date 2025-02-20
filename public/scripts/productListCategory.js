/* eslint-disable no-unused-vars */
const toggleSelect = (button) => {
  const container = button.closest(".select-container");
  const selectList = container.querySelectorAll(".select-list");

  selectList.forEach((element) => element.classList.toggle("hidden"));
};
