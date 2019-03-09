const MAPS = require("./maps.json");
const { getMapCriteria, keyByMapId, toBitsBucket } = require("./util");

const MAPS_BY_ID = MAPS.map(keyByMapId);

const MAP_CRITERIA_PATH = "./casual_criteria.vdf";

function run() {
  const mapCriteria = getMapCriteria(MAP_CRITERIA_PATH).map(str =>
    parseInt(str)
  );
  const bitBuckets = mapCriteria.map(bitCriteria => toBitsBucket(bitCriteria));
  const results = bitBuckets.map((bucket, index) => {
    if (!bucket || !bucket.length) {
      return null;
    }

    return bucket.reduce((acc, bitValue) => {
      const mapById = MAPS_BY_ID[index][bitValue];
      acc[mapById.type] = {
        ...acc[mapById.type],
        [mapById.name]: bitValue
      };

      return acc;
    }, {});
  });

  console.log(results);
}

run();
