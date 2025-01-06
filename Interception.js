const easymidi = require("easymidi");
const { Colors, LModes } = require("./constants.js");
const APCAPI = require("./APCAPI.js");

const mk2output = new easymidi.Output("APC mini mk2");
const input = new easymidi.Input("APC mini mk2");
const toJoker = new easymidi.Output("JokerIn");
const fromJoker = new easymidi.Input("JokerOut");

input.on("noteon", function (msg) {
  // api.toggleNote(msg.note);
  toJoker.send("noteon", {
    ...msg,
  });
});

//Fader routing
input.on("cc", (msg) => {
  toJoker.send("cc", msg);
});

fromJoker.on("noteon", (msg) => {
  // console.log("From Joker: " + JSON.stringify(msg));

  if (msg.velocity == 64) api.setButtonLook(msg.note, "on");
  else api.setButtonLook(msg.note, "off");
});

const api = new APCAPI(mk2output);
api.forEachMatrix((i) => api.setButtonLook(i, "off"));
api.forEachScene((i) => api.setButtonLook(i, "off"));
