exports.isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

exports.formatToNDigits = (value, digits) => {
  return value.toFixed(digits);
};

exports.toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.getRandomKeyInt = index => {
  return Math.floor(Math.random() * 100000) + index;
};
