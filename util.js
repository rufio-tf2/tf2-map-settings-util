const fs = require("fs");

function keyByMapId(obj) {
  let result = {};
  const mapTypes = Object.keys(obj);
  mapTypes.forEach(type => {
    const maps = obj[type];
    Object.entries(maps).forEach(([name, id]) => {
      result[id] = {
        name,
        type
      };
    });
  });

  return result;
}

function toMapBits(string) {
  // 'selected_maps_bits: 3423420648'
  const mapBitsExpression = /(\d+)/;
  const { 1: mapBits } = string.match(mapBitsExpression);

  return mapBits;
}

function getMapCriteria(path) {
  return fs
    .readFileSync(path, "utf-8")
    .split("\n")
    .map(toMapBits);
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function toBitsBucket(bits, bucket = []) {
  if (bits < 1) {
    return bucket;
  }

  const power = Math.floor(getBaseLog(2, bits));
  const mapBit = Math.pow(2, power);
  bucket.push(mapBit);

  return toBitsBucket(bits - mapBit, bucket);
}

module.exports = Object.freeze({
  getMapCriteria,
  keyByMapId,
  toBitsBucket
});
