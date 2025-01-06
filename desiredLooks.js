const { Colors, LModes, TrackButtonIndexes } = require("./constants");

function gP(color = 1, lmode) {
  return { color: color, lmode: lmode };
}

function buildDesiredLooksMap() {
  var desiredLooksMap = new Map();
  const defaultSelectedLook = LModes.Brightness100;
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
    on: gP(Colors.VibrantCyan, LModes.Blinking1t2),
    off: gP(Colors.VibrantCyan, defaultInactiveLook),
  });

  //DIM KEY
  setArray([8, 9, 10, 40, 41, 42], {
    on: gP(Colors.Yellow, LModes.Pulsing1t2),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });

  //SHUT KEY
  setArray([0, 1, 2, 32, 33, 34], {
    on: gP(Colors.White, LModes.Blinking1t16),
    off: gP(Colors.White, defaultInactiveLook),
  });

  //Track Buttons
  setRange(TrackButtonIndexes.start, TrackButtonIndexes.end, {
    on: gP(Colors.Red, LModes.Brightness100),
    off: gP(Colors.Off, 0),
  });

  //Alternating Moving Head Dimmer Buttons
  desiredLooksMap.set(4, {
    on: gP(Colors.Yellow, LModes.Pulsing1t2),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });
  desiredLooksMap.set(5, {
    on: gP(Colors.Yellow, LModes.Pulsing1t4),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });
  desiredLooksMap.set(6, {
    on: gP(Colors.Yellow, LModes.Pulsing1t8),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });
  desiredLooksMap.set(7, {
    on: gP(Colors.Yellow, LModes.Pulsing1t16),
    off: gP(Colors.BrightYellow, defaultInactiveLook),
  });
  // All Shutter
  desiredLooksMap.set(15, {
    on: gP(Colors.White, LModes.Blinking1t16),
    off: gP(Colors.White, defaultInactiveLook),
  });

  //All Color Presets
  desiredLooksMap.set(61, {
    on: gP(Colors.Red, defaultSelectedLook),
    off: gP(Colors.Red, defaultInactiveLook),
  });
  desiredLooksMap.set(62, {
    on: gP(Colors.Green, defaultSelectedLook),
    off: gP(Colors.Green, defaultInactiveLook),
  });
  desiredLooksMap.set(63, {
    on: gP(Colors.Blue, defaultSelectedLook),
    off: gP(Colors.Blue, defaultInactiveLook),
  });
  desiredLooksMap.set(53, {
    on: gP(Colors.Purple, defaultSelectedLook),
    off: gP(Colors.Purple, LModes.Brightness25),
  });
  desiredLooksMap.set(54, {
    on: gP(Colors.BrightBlue, defaultSelectedLook),
    off: gP(Colors.BrightBlue, defaultInactiveLook),
  });
  desiredLooksMap.set(55, {
    on: gP(Colors.Yellow, defaultSelectedLook),
    off: gP(Colors.Yellow, defaultInactiveLook),
  });

  // Schwarze Line durch die Mitte
  //   setArray([3, 11, 19, 27, 35, 43, 51, 59], {
  //     on: gP(Colors.Off, LModes.Brightness10),
  //     off: gP(Colors.Off, LModes.Brightness10),
  //   });

  return desiredLooksMap;
}

module.exports = { buildDesiredLooksMap };
