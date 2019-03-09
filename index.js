const { getMapCriteria, toInteger, toMapData } = require('./util');

const MAP_CRITERIA_PATH = './casual_criteria.vdf';

function run() {
  const mapData = getMapCriteria(MAP_CRITERIA_PATH)
    .map(toInteger)
    .map(toMapData);

  console.log(mapData);
}

run();
