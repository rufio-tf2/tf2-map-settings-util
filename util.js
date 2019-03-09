const fs = require('fs');
const MAPS = require('./maps.json');

function keyByMapBits(obj) {
  const result = {};
  const mapTypes = Object.keys(obj);
  mapTypes.forEach(type => {
    const maps = obj[type];
    Object.entries(maps).forEach(([name, bits]) => {
      result[bits] = {
        bits,
        name,
        type
      };
    });
  });

  return result;
}

const MAPS_BY_ID = MAPS.map(keyByMapBits);

function toMapBits(string) {
  // 'selected_maps_bits: 3423420648'
  const mapBitsExpression = /(\d+)/;
  const { 1: mapBits } = string.match(mapBitsExpression);

  return mapBits;
}

function getMapCriteria(path) {
  return fs
    .readFileSync(path, 'utf-8')
    .split('\n')
    .map(toMapBits);
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
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
    const { bits, name, type } = MAPS_BY_ID[index][bitValue];

    mapData[type] = {
      ...mapData[type],
      [name]: bits
    };

    return mapData;
  }, {});
}

function toInteger(str) {
  return parseInt(str, 10);
}

module.exports = Object.freeze({
  getMapCriteria,
  toInteger,
  toMapData
});
