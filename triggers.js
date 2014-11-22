var parser = require('node-parser');

module.exports = function(bot) {

	/* hear message of any kind */
	bot.on('PRIVMSG',function(parts) {
		var msg_parts = parts.raw.match(/^.*PRIVMSG.*(\#|\@)(.*?)\s+:(.*)$/i)
		if (msg_parts) 
		{
			var target = msg_parts[2];
			var content = msg_parts[3];
			console.log('target =>',target, 'content =>', content);
			bot.trigger('message', bot, target, content)
		}
	});


	bot.on('message', function(bot, target, content) {
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
						bot.trigger('hello', bot, target, content)
					}
				})

			})
		} catch (e) {
			console.log(e)
		}
	});
}