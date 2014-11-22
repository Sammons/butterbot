var bot_core = require('irc-core')

var bot = new bot_core({
	host: 'mizzouacm.irc.slack.com',
	nick: credentials.user,
	pass: credentials.pass,
	channels: ['#general', '#battlebots']
});

bot.open();
// obj = {prefix: { raw:, host:, user:, nickname:,}}

bot.send = function(target, msg) 
{
	console.log('PRIVMSG #'+target+' :'+msg)
	bot.write('PRIVMSG #'+target+' :'+msg);
}

bot.on('any', function(parts) {
})


//':sammons!sammons@irc.tinyspeck.com PRIVMSG #general :on a lot of things' } }
bot.on('PRIVMSG',function(parts) {
	var msg_parts = parts.raw.match(/^.*PRIVMSG.*(\#|\@)(.*?)\s+:(.*)$/i)
	if (msg_parts) 
	{
		var target = msg_parts[2];
		var content = msg_parts[3];
		console.log('target =>',target, 'content =>', content);
		if (target == "battlebots")
		bot.send(target, 'damnit, my ears itch');
	}
})