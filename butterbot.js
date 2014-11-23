var bot_core = require('irc-core');
var credentials = require('./credentials.js');
var cp = require('child_process');

var bot = new bot_core({
	host: 'mizzouacm.irc.slack.com',
	nick: credentials.user,
	pass: credentials.pass,
	channels: ['#general', '#battlebots']
});

bot.open();

bot.q = [];

bot.sending = setInterval(function() {
	if (bot.q.length > 0) {
		var cur = bot.q.shift();
		bot.write('PRIVMSG #'+cur.target+' :'+cur.msg)
	}
},400);
bot.sending.unref();

bot.add_to_q = function(target, msg) {
	bot.q.push({target: target, msg: msg});
}

bot.send = function(target, msg) 
{
	if (bot.q.length > 50) {
		bot.q.splice(10,30);
	}
	var msgs = msg.split('\n');
	for (var i in msgs)
		bot.add_to_q(target, msgs[i]);
}

require('./vocabulary.js')(bot);
require('./actions.js' )(bot);
require('./triggers.js')(bot);

bot.on('any', function(parts) {
})

var lbler = 0;
bot.thoughts = {};
bot.patience_interval = 2000;


var timer = Date.now();
function setupChild(bot) {

	bot.child = cp.fork('./imagination.js');
	bot.child.on('message', function(d) {
		if (!d.data) return;
		var m = d.data;
		if (m == "__buggerydemons__") {
			timer = Date.now();
			return;
		}
		var who = m.substring(0,2);
		m = m.substring(2);
		bot.send(bot.thoughts[who], 'butter power provides: '+m)
	})
	bot.child.on('error', function() {
		bot.child.kill();
		setupChild(bot);
	})


}
var last_thot = lbler;
bot.think = function(from, target, msg) {
	if (!bot.child) setupChild(bot);
	lbler = lbler/1;
	lbler = lbler + 1 % 100;
	if (lbler < 10) lbler = '0'+lbler
	last_thot = lbler;
	bot.thoughts[lbler] = target;
	bot.child.send({ data: lbler+msg});
}
bot.patience = setInterval(function() {
	if (bot.child)
	if ( (Date.now() - timer) > bot.patience_interval ) {
		bot.child.kill();
		setupChild(bot);
	}
},bot.patience_interval)
