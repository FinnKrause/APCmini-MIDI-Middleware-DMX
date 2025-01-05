const { SceneLaunchButtonIndexes, TrackButtonIndexes, MatrixButtonIdexes, LModes, Colors } = require("./constants.js");

class APCAPI {
  constructor(output) {
    this.output = output;
    this.MatrixButtonMap = new Map(); // int: {acitve: boolean, lastValue: {}}
    this.SCButtonMap = new Map(); // int: {acitve: boolean, lastValue: {}}

    this.defaultConfig = { velocity: Colors.Red, channel: LModes.Blinking1t4, blink: true };
  }

  getNote(nnote) {
    return this.MatrixButtonMap.get(nnote) || this.SCButtonMap.get(nnote);
  }

  printSCButtonMap() {
    this.SCButtonMap.forEach((value, key) => {
      console.log(`${key}: ${JSON.stringify(value)}`);
    });
  }

  toggleNote(nnote) {
    if (this.MatrixButtonMap.has(nnote)) {
      const element = this.MatrixButtonMap.get(nnote);

      if (element.active === true) {
        this.turnOffNote(nnote);
        return;
      }

      this.changeMatrixButton(nnote, element.lastConfig.velocity, element.lastConfig.channel);
    } else if (this.SCButtonMap.has(nnote)) {
      const element = this.SCButtonMap.get(nnote);

      if (element.active) {
        this.turnOffNote(nnote);
        return;
      }
      this.changeSingleColorButton(nnote, element.lastConfig.blink);
    } else {
      new Error("No entry found");
    }
  }

  changeMatrixButton(nnote, color = Colors.Red, LightingMode = LModes.Brightness100) {
    this.output.send("noteon", {
      note: nnote,
      velocity: color,
      channel: LightingMode,
    });

    this.#toggleButton(nnote, true, {
      velocity: color,
      channel: LightingMode,
    });
  }

  changeSingleColorButton(nnote, blink = false) {
    if (nnote > 119 || (nnote > 107 && nnote < 112) || nnote < 100) {
      throw new Error(`The note [${nnote}] is not a single-color-button`);
    }
    this.output.send("noteon", {
      note: nnote,
      velocity: blink ? 0x02 : 0x01,
      channel: 0,
    });
    this.#toggleButton(nnote, true, {
      blink: blink,
    });
  }

  turnOffNote(nnote) {
    this.output.send("noteon", {
      note: nnote,
      velocity: 0,
      channel: 0,
    });
    this.#toggleButton(nnote, false);
  }

  changeAllMatrix(color, LightingMode = LModes.Brightness100) {
    for (let i = 0; i < 64; i++) {
      this.changeMatrixButton(i, color, LightingMode);
    }
  }

  OffAllMatrix() {
    for (let i = 0; i < 64; i++) {
      this.turnOffNote(i);
    }
  }

  changeAllScene(blink = false) {
    for (let i = SceneLaunchButtonIndexes.start; i <= SceneLaunchButtonIndexes.end; i++) {
      this.changeSingleColorButton(i, blink);
    }
  }

  offAllScene(blink = false) {
    for (let i = SceneLaunchButtonIndexes.start; i <= SceneLaunchButtonIndexes.end; i++) {
      this.turnOffNote(i);
    }
  }

  changeAllTrack(blink = false) {
    for (let i = TrackButtonIndexes.start; i <= TrackButtonIndexes.end; i++) {
      this.changeSingleColorButton(i, blink);
    }
  }

  offAllTrack(blink = false) {
    for (let i = TrackButtonIndexes.start; i <= TrackButtonIndexes.end; i++) {
      this.turnOffNote(i);
    }
  }

  turnOffAll() {
    for (let i = 0; i < 68; i++) {
      this.turnOffNote(i);
    }
    for (let i = SceneLaunchButtonIndexes.start; i <= SceneLaunchButtonIndexes.end; i++) {
      this.turnOffNote(i);
    }

    for (let i = TrackButtonIndexes.start; i <= TrackButtonIndexes.end; i++) {
      this.turnOffNote(i);
    }
  }

  // Not production ready
  #changeMultiple(data) {
    this.output.send("sysex", [0xf0, ...data, 0xf7]);
  }

  #toggleButton(note, active, newConfig, debug = false) {
    const isMatrixButton = note >= MatrixButtonIdexes.start && note <= MatrixButtonIdexes.end;
    const buttonMap = isMatrixButton ? this.MatrixButtonMap : this.SCButtonMap;

    if (!buttonMap.has(note)) {
      buttonMap.set(note, { active: active, lastConfig: newConfig });
      if (debug) {
        console.log(`First time set <${note}> to value <${active}> with new data <${JSON.stringify(newConfig)}>`);
      }
      return;
    }

    const oldData = buttonMap.get(note);

    if (!active) {
      buttonMap.set(note, { ...oldData, active: active });
      if (debug) {
        console.log(
          `Set note <${note}> to value <${active}> with the updated but old data <${JSON.stringify({
            ...oldData,
            active: active,
          })}>`
        );
      }
      return;
    }

    buttonMap.set(note, { active: active, lastConfig: newConfig });
    if (debug) {
      console.log(`Set note <${note}> to value <${active}> with new data <${JSON.stringify(newConfig)}>`);
    }
  }
}

module.exports = APCAPI;
