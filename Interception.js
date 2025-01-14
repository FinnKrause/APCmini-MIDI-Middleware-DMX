const easymidi = require("easymidi");
const APCAPI = require("./core/APCAPI.js");

if (!easymidi.getInputs().includes("APC mini mk2") || !easymidi.getOutputs().includes("APC mini mk2") || !easymidi.getOutputs().includes("JokerIn") || !easymidi.getInputs().includes("JokerOut")) {
  console.error("Not all necessary midi devices are connected!")
  console.error("There should be *BOTH* an Input & Output named 'APC mini mk2', an *Output* called 'JokerIn' and an *Input* called 'JokerOut'.\nCheck that the program 'loopMIDI' is running in the background!")
  console.error("Returning...")
  return;
}

const toAPC = new easymidi.Output("APC mini mk2");
const fromAPC = new easymidi.Input("APC mini mk2");
const toJoker = new easymidi.Output("JokerIn");
const fromJoker = new easymidi.Input("JokerOut");

const APCmini = new APCAPI(toAPC);

APCmini.forEachMatrix((i) => APCmini.setButtonLook(i, "off"));
APCmini.forEachScene((i) => APCmini.setButtonLook(i, "off"));
APCmini.forEachTrack((i) => APCmini.setButtonLook(i, "off"));

// Forwarding all traffic
// Direction: APC mini --> DMX Joker
fromAPC.on("noteon", (msg) => toJoker.send("noteon", { ...msg }));
fromAPC.on("cc", (msg) => toJoker.send("cc", { ...msg }));

// Handling button state chan0ges
// Direction: DMX Joker --> APC mini
fromJoker.on("noteon", (msg) => {
  console.log("Joker sent message: " + JSON.stringify(msg))
  if (msg.velocity == 64) APCmini.setButtonLook(msg.note, "on");
  else APCmini.setButtonLook(msg.note, "off");
});

console.log("Interception running")