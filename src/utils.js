exports.isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

exports.formatToNDigits = (value, digits) => {
  return value.toFixed(digits);
};
