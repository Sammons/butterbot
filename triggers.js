var parser = require('node-parser');

module.exports = function(bot) {

	/* hear message of any kind */
	bot.on('PRIVMSG',function(parts) {
		var msg_parts = parts.raw.match(/^:(.*?)\!.*@.*\s.*PRIVMSG.*(\#|\@)(.*?)\s+:(.*)$/i)
		if (msg_parts) 
		{
			var from = msg_parts[1].replace('(bot)','');
			var target = msg_parts[3];
			var content = msg_parts[4];
			console.log('from =>', from, 'target =>',target, 'content =>', content);
			bot.trigger('message', bot, from,  target, content)
		}
	});

	bot.on('message', function(bot, from, target, content) {
		if (from.trim().match(/slackbot/i)){
			bot.trigger('slackbot_spoke', bot, from, target, content);
		}
	})

	bot.on('message', function(bot, from, target, content) {
		const tokens = {
			NUMBER: /^[0-9]+(\.[0-9]+)?/,
			LPAREN:  /^\(/,
			RPAREN: /^\)/,
			OP: /^(\*|\+|\/)/,
			IGNORE: /^\s/ //necessary to delimit tokens, not tested with other than whitespace
		},
		non_terminals = {
			MATH_EXP: [
				[ 'NUMBER' ],
				[ 'LPAREN', 'MATH_EXP', 'RPAREN' ],
				[ 'MATH_EXP', 'OP', 'MATH_EXP' ]
			]
		};
		try {
			parser.analyze( content, tokens, non_terminals, function(emitter, root) {
				if (root != null) 
				{
					bot.trigger('math_exp', bot, from, target, content);
				}
			})
		} catch (e) {
			console.log(e)
		}
	})

	bot.on('message', function(bot,from, target, content) {
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
			parser.analyze( content, tokens, non_terminals, function(emitter, root) {
				var said_something = false;
				emitter.on('ME', function() {
					console	.log("I'm saying hello");
					if (!said_something) {
						said_something = true;
						bot.trigger('hello', bot, from, target, content)
					}
				})

			})
		} catch (e) {
			console.log(e)
		}
	});
}