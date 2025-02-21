/* eslint-disable no-undef */
const ProtectedForm = (form) => {
  const openModalButton = form.querySelector(".open-dialog");
  const dialog = form.querySelector("dialog");
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

  openModalButton.addEventListener("click", openModal);
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
};

document.querySelectorAll("form").forEach((form) => ProtectedForm(form));
