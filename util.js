const MAPS = require('./maps.json');

function toInteger(str) {
  return parseInt(str, 10);
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function keyByMapBits(obj) {
  return Object.entries(obj).reduce(
    (accumulator, [type, maps]) => ({
      ...accumulator,
      ...Object.entries(maps).reduce(
        (results, [name, bits]) => ({
          ...results,
          [bits]: { bits, name, type }
        }),
        {}
      )
    }),
    {}
  );
}

const MAPS_BY_BITS = MAPS.map(keyByMapBits);

function getMapByBits(bucket, bits) {
  return MAPS_BY_BITS[bucket][bits];
}

function toMapBits(string) {
  // 'selected_maps_bits: 3423420648'
  const mapBitsExpression = /(\d+)/;
  const { 1: mapBits } = string.match(mapBitsExpression);

  return toInteger(mapBits);
}

function parseBits(bits, bucket = []) {
  if (bits < 1) {
    return bucket;
  }

  const power = Math.floor(getBaseLog(2, bits));
  const mapBit = 2 ** power;

  bucket.push(mapBit);

  return parseBits(bits - mapBit, bucket);
}

function toMapData(mapBitSum, index) {
  const parsedBits = parseBits(mapBitSum);

  if (!parsedBits || !parsedBits.length) {
    return null;
  }

  return parsedBits.reduce((mapData, bitValue) => {
    const { bits, name, type } = getMapByBits(index, bitValue);

    mapData[type] = {
      ...mapData[type],
      [name]: bits
    };

    return mapData;
  }, {});
}

function getMapCriteria(mapCriteriaFile) {
  return mapCriteriaFile
    .split('\n')
    .map(toMapBits)
    .map(toMapData);
}

module.exports = Object.freeze({
  getMapCriteria,
  toMapData
});
