const fs = require('fs');
const { getMapCriteria } = require('./util');

const MAP_CRITERIA_PATH = './casual_criteria.vdf';

function run() {
  const mapCriteriaFile = fs.readFileSync(MAP_CRITERIA_PATH, 'utf-8');

  const mapData = getMapCriteria(mapCriteriaFile);

  console.log(mapData);
}

run();
