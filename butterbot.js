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

bot.send = function(target, msg) 
{
	console.log('PRIVMSG #'+target+' :'+msg)
	bot.write('PRIVMSG #'+target+' :'+msg);
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
		console.log(arguments)
		if (!d.data) return;
		var m = d.data;
		timer = Date.now();
		if (m == "__buggerydemons__") {
			return;
		}
		var who = m.substring(0,2);
		m = m.substring(2);
		bot.send(bot.thoughts[who], 'butter power provides: '+m)
		delete bot.thoughts[who];
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
		bot.send(bot.thoughts[last_thot], 'ouch: timeout')
	}
},bot.patience_interval)
