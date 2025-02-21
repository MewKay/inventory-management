/* eslint-disable no-undef */
const container = document.querySelector(".select-container");
const selectList = container.querySelector(".select-list");
const expandButton = container.querySelector(".select-expand");

const toggleHidden = () => selectList.classList.toggle("hidden");

expandButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleHidden();
});
selectList.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("click", () => {
  if (selectList.classList.contains("hidden")) {
    return;
  }
  toggleHidden();
});
