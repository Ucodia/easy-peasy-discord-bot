const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomOf = array => array[randomInt(0, array.length - 1)];

module.exports = {
  randomInt,
  randomOf
};
