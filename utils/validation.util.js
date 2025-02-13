const groupErrorsByField =
  function formatValidationResultArraytoFieldsWithAllMessages(errorsArray) {
    const initialFormattedErrors = {};
    const formattedErrors = errorsArray.reduce(
      (previousFormattedErrors, currentError) => {
        const field = currentError.path;
        previousFormattedErrors[field] = previousFormattedErrors[field] || [];
        previousFormattedErrors[field].push(currentError.msg);
        return previousFormattedErrors;
      },
      initialFormattedErrors,
    );

    return formattedErrors;
  };

module.exports = { groupErrorsByField };
