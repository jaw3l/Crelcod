var Discordie = require("discordie");
var Events = Discordie.Events;

var client = new Discordie();

client.connect({ token: "" });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});
