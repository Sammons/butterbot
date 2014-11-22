var bot_core = require('irc-core');
var credentials = require('./credentials.js');

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

bot.vocabulary = require('./vocabulary.js')

require('./actions.js' )(bot);
require('./triggers.js')(bot);

bot.on('any', function(parts) {
})


