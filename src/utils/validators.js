const isNotEmpty = (value) => {
  return (
    value !== undefined && value !== null && value.toString().trim() !== ""
  );
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidId = (id) => {
  return !isNaN(id) && Number(id) > 0;
};

module.exports = {
  isNotEmpty,
  isValidEmail,
  isValidId,
};
