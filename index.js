const { getMapCriteria, toMapData } = require('./util');

const MAP_CRITERIA_PATH = './casual_criteria.vdf';

function run() {
  const mapData = getMapCriteria(MAP_CRITERIA_PATH).map(toMapData);

  console.log(mapData);
}

run();
