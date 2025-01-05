//! Note: JAVASCRIPT IST DER GRÖSSTE MÜLL UND ICH WILL EIGENTLICH TYPESCRIPT NUTZEN ABER ICH BIN ZU FAUL DAS DANN IMMER ZU KONVERTIEREN

const easymidi = require("easymidi");
const { Colors, LModes } = require("./constants.js");
const APCAPI = require("./APCAPI.js");

const mk2output = new easymidi.Output("APC mini mk2");
const input = new easymidi.Input("APC mini mk2");

const midiloopoutput = new easymidi.Output("loopMidi Middleware");

input.on("noteon", function (msg) {
  api.toggleNote(msg.note);
  console.log(msg);

  // midiloopoutput.send(msg);
});

const api = new APCAPI(mk2output);

api.turnOffAll();

api.changeAllMatrix(Colors.Blue, LModes.Brightness100);
api.changeAllTrack();
api.changeAllScene();

//TODO: Get the forwarding going and receive the feedback on the same MIDI Loopback device
