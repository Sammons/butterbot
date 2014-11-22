var bot_core = require('irc-core');
var parser = require('node-parser');

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

tokens = {
	NUMBER: /^[0-9\.]+/,
	OP:     /^[\+\-\/\*]/,
	EQUAL:  /^\=\=/,
	ASSIGN: /^\=/,
	LPAREN: /^\(/,
	RPAREN: /^\)/,
	LCURL:  /^\{/,
	RCURL:  /^\}/,
	IGNORE: /^\s/ //necessary to delimit tokens, not tested with other than whitespace
}

non_terminals = {
	MATH_EXP : [ 
     [ 'NUMBER'],
	 [ 'NUMBER', 'OP','NUMBER'        ],
	 [ 'LPAREN', 'MATH_EXP', 'RPAREN' ],
	 [ 'MATH_EXP', 'OP', 'MATH_EXP'   ],
	 [ 'MATH_EXP', 'OP', 'NUMBER'     ],
	 [ 'NUMBER', 'OP', 'MATH_EXP'     ]
	 ]
}

parser.on( 'MATH_EXP', function( op ) {
	console.log( 'MATH_EXP', op )
})

parser.analyze( 'input.txt', tokens, non_terminals, function( tree ) {
	console.log('root node:',JSON.stringify(tree).replace('{','\n{'))
} )