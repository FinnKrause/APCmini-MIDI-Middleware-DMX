const { Colors, LModes } = require("./constants");

function gP(color, lmode) {
  return { color: color, lmode: lmode };
}

function buildDesiredLooksMap() {
  const desiredLooksMap = new Map();

  const setRange = (start, end, modes) => {
    for (let i = start; i <= end; i++) {
      desiredLooksMap.set(i, modes);
    }
  };

  const setArray = (array, modes) => {
    for (const i of array) {
      desiredLooksMap.set(i, modes);
    }
  };

  setRange(56, 62, {
    on: gP(Colors.Green, LModes.Blinking1t2),
    off: gP(Colors.BrightGreen, LModes.Brightness10),
  });

  setArray([3, 11, 19, 27, 35, 43, 51, 59], {
    on: gP(0, LModes.Brightness10),
    off: gP(0, LModes.Brightness10),
  });

  return desiredLooksMap;
}

module.exports = { buildDesiredLooksMap };
