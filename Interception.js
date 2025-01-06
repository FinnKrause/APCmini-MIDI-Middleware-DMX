const easymidi = require("easymidi");
const { Colors, LModes } = require("./constants.js");
const APCAPI = require("./APCAPI.js");

const toAPC = new easymidi.Output("APC mini mk2");
const fromAPC = new easymidi.Input("APC mini mk2");
const toJoker = new easymidi.Output("JokerIn");
const fromJoker = new easymidi.Input("JokerOut");

const APCmini = new APCAPI(toAPC);

// Forwarding all traffic
// Direction: APC mini --> DMX Joker
fromAPC.on("noteon", () => toJoker.send("noteon", { ...msg }));
fromAPC.on("cc", (msg) => toJoker.send("cc", msg));

// Handling button state changes
// Direction: DMX Joker --> APC mini
fromJoker.on("noteon", (msg) => {
  if (msg.velocity == 64) APCmini.setButtonLook(msg.note, "on");
  else APCmini.setButtonLook(msg.note, "off");
});
W;
APCmini.forEachMatrix((i) => APCmini.setButtonLook(i, "off"));
APCmini.forEachScene((i) => APCmini.setButtonLook(i, "off"));
