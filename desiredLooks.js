const { Colors, LModes } = require("./constants");

function gP(color = 1, lmode) {
  return { color: color, lmode: lmode };
}

function buildDesiredLooksMap() {
  var desiredLooksMap = new Map();
  const defaultSelectedLook = LModes.Blinking1t2;
  const defaultInactiveLook = LModes.Brightness10;

  const setRange = (start, end, modes) => {
    for (let i = start; i <= end; i++) desiredLooksMap.set(i, modes);
  };
  const setArray = (array, modes) => {
    for (const i of array) desiredLooksMap.set(i, modes);
  };

  //Pattern creation

  //MOV
  setArray([24, 25, 26, 56, 57, 58], {
    on: gP(Colors.Green, defaultSelectedLook),
    off: gP(Colors.BrightGreen, defaultInactiveLook),
  });

  //POS
  setArray([16, 17, 18, 48, 49, 50], {
    // on: gP(Colors.Turquoise, LModes.Blinking1t2),
    off: gP(Colors.VibrantCyan, defaultInactiveLook),
  });

  //DIM KEY
  setArray([8, 9, 10, 40, 41, 42], {
    on: gP(Colors.Yellow, defaultSelectedLook),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });

  //SHUT KEY
  setArray([0, 1, 2, 32, 33, 34], {
    on: gP(Colors.White, LModes.Blinking1t16),
    off: gP(Colors.White, defaultInactiveLook),
  });

  // Schwarze Line durch die Mitte
  //   setArray([3, 11, 19, 27, 35, 43, 51, 59], {
  //     on: gP(Colors.Off, LModes.Brightness10),
  //     off: gP(Colors.Off, LModes.Brightness10),
  //   });

  return desiredLooksMap;
}

module.exports = { buildDesiredLooksMap };
