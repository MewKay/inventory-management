// eslint-disable-next-line no-undef
const dialog = document.querySelector("dialog");
const form = dialog.closest("form");
const passwordInput = dialog.querySelector("input");
const confirmButton = dialog.querySelector(".confirm");
const cancelButton = dialog.querySelector(".cancel");

const openModal = () => {
  passwordInput.removeAttribute("disabled");
  dialog.showModal();
};

const closeModal = () => {
  passwordInput.setAttribute("disabled", "");
  dialog.close();
};

const submitForm = (e) => {
  e.preventDefault();

  if (!passwordInput.checkValidity()) {
    openModal();
    passwordInput.reportValidity();
    return;
  }

  if (!form.checkValidity() && passwordInput.checkValidity()) {
    closeModal();
    form.reportValidity();
    return;
  }

  form.requestSubmit();
};

cancelButton.addEventListener("click", closeModal);
confirmButton.addEventListener("click", submitForm);

form.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !dialog.open) {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    openModal();
  }
});

dialog.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && dialog.open) {
    submitForm(e);
  }
});
