const { SceneLaunchButtonIndexes, TrackButtonIndexes, MatrixButtonIdexes, LModes, Colors, BottmonRightButtonIdex } = require("./constants.js");
const { buildDesiredLooksMap } = require("./desiredLooks.js");

class APCAPI {
  constructor(output, deslook) {
    this.output = output;
    this.desiredLooks = buildDesiredLooksMap();
  }

  setButtonLook(nnote, look) {
    if (!this.#isButtonPressValid(nnote)) return;

    if (!this.desiredLooks.has(nnote) || this.desiredLooks.get(nnote)[look] == undefined) {
      switch (look) {
        case "off":
          // this.changeButton(nnote, Colors.Red, LModes.Brightness10);
          this.offNote(nnote);
          break;
        default:
          this.changeButton(nnote, Colors.Red, LModes.Blinking1t16);
          break;
      }
      return;
    }

    const queriedLook = this.desiredLooks.get(nnote);
    this.changeButton(nnote, queriedLook[look].color, queriedLook[look].lmode);
  }

  changeButton(nnote, color, lmode) {
    if (!this.#isButtonPressValid(nnote)) return;

    if (this.#isMatrixButton(nnote)) {
      this.output.send("noteon", {
        note: nnote,
        velocity: color,
        channel: lmode,
      });
    } else if (this.#isSCButton(nnote)) {
      this.output.send("noteon", {
        note: nnote,
        velocity: lmode > 6 ? 0x02 : lmode == 0 ? 0x0 : 0x01,
        channel: 0,
      });
    }
  }

  offNote(nnote) {
    if (!this.#isButtonPressValid(nnote)) return;

    this.output.send("noteon", {
      note: nnote,
      velocity: 0,
      channel: 0,
    });
  }

  offAll() {
    this.forEach(this.offNote);
  }

  forEach(callback) {
    this.forEachMatrix(callback);
    this.forEachTrack(callback);
    this.forEachScene(callback);
  }

  forEachMatrix(callback) {
    for (let i = MatrixButtonIdexes.start; i <= MatrixButtonIdexes.end; i++) {
      callback(i);
    }
  }

  forEachTrack(callback) {
    for (let i = TrackButtonIndexes.start; i <= TrackButtonIndexes.end; i++) {
      callback(i);
    }
    callback(BottmonRightButtonIdex);
  }

  forEachScene(callback) {
    for (let i = SceneLaunchButtonIndexes.start; i <= SceneLaunchButtonIndexes.end; i++) {
      callback(i);
    }
  }

  #isMatrixButton(nnote) {
    return nnote >= MatrixButtonIdexes.start && nnote <= MatrixButtonIdexes.end;
  }

  #isSCButton(nnote) {
    return (
      (nnote >= SceneLaunchButtonIndexes.start && nnote <= SceneLaunchButtonIndexes.end) ||
      (nnote >= TrackButtonIndexes.start && nnote <= TrackButtonIndexes.end) ||
      nnote === BottmonRightButtonIdex
    );
  }

  #isButtonPressValid(nnote) {
    if (!this.#isMatrixButton(nnote) && !this.#isSCButton(nnote)) {
      console.log(`Button <${nnote}> is neither a matrix button, nor a SC button.`);
      return false;
    }
    return true;
  }
}

module.exports = APCAPI;
