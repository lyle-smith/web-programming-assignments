function findIdInArray(array, id) {
  return array.find((element) => element.toString() === id.toString());
}

module.exports = {
  findIdInArray,
}