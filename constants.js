const Colors = {
  Off: 0,
  White: 3,

  Red: 5, // #FF0000
  BrightRed: 4, // #FF4C4C

  Green: 21, // #00FF00
  BrightGreen: 17, // #54FF00

  Blue: 45, // #0000FF
  BrightBlue: 36, // #4CC3FF

  Magenta: 53, // #FF00FF
  Orange: 9, // #FF5400
  Purple: 49, // #874CFF
  VividPink: 56, // #FF4C87
  NeonPink: 57, // #FF0054
  Turquoise: 32, // #4CFFB7

  BrightCoral: 4, // #FF4C4C

  Yellow: 13, // #FFFF00
  BrightYellow: 12, // #FFFF4C

  VibrantCyan: 37, // #00A9FF
  Cyan: 119, // #E0FFFF
}; //19 Elements ohne Off

const LModes = {
  Brightness10: 0,
  Brightness25: 1,
  Brightness50: 2,
  Brightness65: 3,
  Brightness75: 4,
  Brightness90: 5,
  Brightness100: 6,
  Pulsing1t16: 7,
  Pulsing1t8: 8,
  Pulsing1t4: 9,
  Pulsing1t2: 10,
  Blinking1t24: 11,
  Blinking1t16: 12,
  Blinking1t8: 13,
  Blinking1t4: 14,
  Blinking1t2: 15,
};

const MatrixButtonIdexes = { start: 0, end: 63 };
const SceneLaunchButtonIndexes = { start: 112, end: 119 };
const TrackButtonIndexes = { start: 100, end: 107 };
const BottmonRightButtonIdex = 122;

module.exports = {
  Colors,
  LModes,
  MatrixButtonIdexes,
  BottmonRightButtonIdex,
  SceneLaunchButtonIndexes,
  TrackButtonIndexes,
};
