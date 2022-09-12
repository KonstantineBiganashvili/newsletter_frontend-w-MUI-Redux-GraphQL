export const validEmail = (email) => {
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return validateEmail.test(email);
};

export const validString = (name) => {
  const validateName = /^[A-Za-z ]{2,}$/;
  return !name ? false : validateName.test(name);
};
