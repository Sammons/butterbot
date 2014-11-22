var bot_core = require('irc-core');
var parser = require('node-parser');
var credentials = require('./credentials.js');

var bot = new bot_core({
	host: 'mizzouacm.irc.slack.com',
	nick: credentials.user,
	pass: credentials.pass,
	channels: ['#general', '#battlebots']
});

const tokens = {
	NUMBER: /^[0-9\.]+/,
	OP:     /^[\+\-\/\*]/,
	EQUAL:  /^\=\=/,
	ASSIGN: /^\=/,
	LPAREN: /^\(/,
	RPAREN: /^\)/,
	LCURL:  /^\{/,
	RCURL:  /^\}/,
	IGNORE: /^\s/ //necessary to delimit tokens, not tested with other than whitespace
},
non_terminals = {
	MATH_EXP : [ 
	 [ 'LPAREN', 'MATH_EXP', 'RPAREN' ],
	 [ 'MATH_EXP', 'OP', 'MATH_EXP'   ],
     [ 'NUMBER'],
	 ]
}

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
		for (var i in bot.triggers) {
			bot.triggers[i](bot, target, content);
		}
	}
})


bot.vocab = {};

bot.vocab.phrases = {};

bot.vocab.phrases.hello = [
	'what\'s happenin\' my human!',
	'yo',
	'hello',
	'hello there',
	'hey!',
	'What\'s up!',
	'I hear ya',
	'what!? I didn\'t realize I could actually hear anything!'
];

bot.vocab.hello = function() {
	return bot.vocab.phrases.hello[ 
		Math.round(Math.random()) % bot.vocab.phrases.hello.length 
	];
}

bot.actions = {};

bot.actions.say_hello = function(bot, target, message) {
	bot.send(target, bot.vocab.hello());
}

bot.triggers = {}

bot.triggers.hear_hello = function(bot, target, message) {
	const tokens = {
		ME: /^(butterbot|buttery|bot|butter)/i,
		GREETING:  /^(hello|sup|what's\sup|what's\snew|hey|hi|yo)/i,
		IGNORE: /^\s/ //necessary to delimit tokens, not tested with other than whitespace
	},
	non_terminals = {
		HELLO : [ 
		 [ 'HELLO', 'ME' ],
	     [ 'HELLO', 'GREETING'],
		 [ 'GREETING']
		 ]
	};
	try {
		parser.analyze( message, tokens, non_terminals, function(emitter, root) {
			var said_something = false;
			emitter.on('HELLO', function() {
				bot.actions.say_hello(bot, target, message);
			})
		})
	} catch (e) {
		console.log(e)
		// do nothing
	}
}

