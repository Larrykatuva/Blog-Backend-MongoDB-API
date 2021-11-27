const Errors = {
  USR_01: 'Email or Password is invalid.',
  USR_02: 'The field(s) are/is required.',
  USR_03: 'The email is invalid.',
  USR_04: 'The email already exists.',
  USR_05: "The email doesn't exist."
};

export const handleUserErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};