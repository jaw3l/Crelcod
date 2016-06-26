var reload  = require('require-reload')(require),
	Discordie        = require('discordie'),
  os               = require('os'),
  mathjs           = require('mathjs'),
	_chalk           = require('chalk'),
	chalk            = new _chalk.constructor({enabled: true}),
	config			     = reload('./config.json'),
	version					 = require("./package.json").version,
	ready = false;

var client = new Discordie({autoReconnect: true});

var version = "0.1a";
var clientid = ""; // Bot's Client ID
var auth = { token: "" }; // Bot's Token
try { auth = require("./auth"); } catch(e) {}

//console colors
  cWarn	= chalk.bgYellow.black;
  cError	= chalk.bgRed.black;
  cDebug	= chalk.bgWhite.black;
  cGreen	= chalk.bold.green;
  cRed	= chalk.bold.red;
  cServer	= chalk.bold.magenta;
  cYellow	= chalk.bold.yellow;
  cBlue	= chalk.bold.blue;

commandsProcessed = 0;
cleverbotTimesUsed = 0;

client.connect(auth);

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username + "\t#" + client.User.discriminator);
  console.log("Servers Connected: " + client.Guilds.size);
  console.log("Channels Connected: " + client.Channels.size);
  console.log("Users Connected: " + client.Users.size);
  console.log("---------------------------------INVITE LINK----------------------------------")
  console.log("https://discordapp.com/oauth2/authorize?client_id="+ clientid +"&scope=bot")
  console.log("------------------------------------------------------------------------------")
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
  var msg = e.message;

	// Info
	if (e.message.content == "info")
		msg.channel.sendMessage("```md"
		+ "\n[INFO]:"
		+ "\n[Bot Name](" + client.User.username + "#" + client.User.discriminator + ")"
		+ "\n[Bot ID](" + client.User.id + ")"
		+ "\n[Bot Avatar](" + client.User.avatar + ")"
		+ "\n[Is Bot?](" + client.User.bot + ")"
		+ "\n```")
  // Stats
  if (msg.content == "stats")
    msg.channel.sendMessage("```md"
		+ "\n[STATS]:"
		+ "\n[Commands Used](" + commandsProcessed + ")"
		+ "\n[Cleverbot Used](" + cleverbotTimesUsed + ")"
		+ "\n[Uptime](" + secondsToString(process.uptime()).slice(0, -1) + ")"
		+ "\n```")
  // Debug
  if (msg.content == "debug")
    msg.channel.sendMessage("```md"
    + "\n[DEBUG]:"
    + "\n[System Info](" + process.platform + "-" + process.arch + " with " + process.release.name + " " + process.version + ")"
    + "\n[Process Info](PID " + process.pid + ")"//+ " at " + process.cwd() + ")"
    + "\n[Process Memory Usage](" + Math.ceil(process.memoryUsage().heapTotal / 1000000) + "MB)"
    //+ "\n[Process CPU Usage](" + process.cpuUsage + ")"
    + "\n[System Memory Usage](" + Math.ceil((os.totalmem() - os.freemem()) / 1000000) + " of " + Math.ceil(os.totalmem() / 1000000) + "MB)"
		+ "\n[System Uptime](" + secondsToString(os.uptime()) + ")"
		+ "\n```")
  // Ping
  if (e.message.content == "ping")
    e.message.channel.sendMessage("pong");
  // Join
  if (e.message.content == "invite")
    e.message.channel.sendMessage("__**My Discord Invite Link**__" + "\nhttps://discordapp.com/oauth2/authorize?client_id="+ clientid +"&scope=bot");
  // Get Roles
  if (e.message.content !== "getroles") return;
    var member = e.message.member;
    var member = e.message.author.memberOf(e.message.guild);
    const roleNames = member.roles.map(role => role.name);
    e.message.reply("Roles: " + (roleNames.join(", ") || "no roles"));
});

// Functions

function secondsToString(seconds) {
    try {
        var numyears = Math.floor(seconds / 31536000);
        var numdays = Math.floor((seconds % 31536000) / 86400);
        var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60);

        var str = "";
        if(numyears>0) {
            str += numyears + " year" + (numyears==1 ? "" : "s") + " ";
        }
        if(numdays>0) {
            str += numdays + " day" + (numdays==1 ? "" : "s") + " ";
        }
        if(numhours>0) {
            str += numhours + " hour" + (numhours==1 ? "" : "s") + " ";
        }
        if(numminutes>0) {
            str += numminutes + " minute" + (numminutes==1 ? "" : "s") + " ";
        }
        if(numseconds>0) {
            str += numseconds + " second" + (numseconds==1 ? "" : "s") + " ";
        }
        return str;
    } catch(err) {
        logMsg(Date.now(), "ERROR", "General", null, "Failed to process secondsToString request");
        return;
    }
}
