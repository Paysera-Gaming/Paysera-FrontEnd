export const isValidName = (name: string) => {
  const regex = /^[a-zA-Z]+\s*,\s*[a-zA-Z]+\s*(?:[a-zA-Z]+)?$/;
  return regex.test(name);
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
