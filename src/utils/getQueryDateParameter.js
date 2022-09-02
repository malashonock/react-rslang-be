module.exports = (param, defaultValue) => {
  return param ? new Date(param) : defaultValue;
};
