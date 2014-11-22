var vocab = module.exports = {};

vocab.hello = function() {
	return bot.vocab.phrases.hello[ 
		Math.round(Math.random()) % bot.vocab.phrases.hello.length 
	];
}


vocab.phrases = {};

vocab.phrases.hello = [
	'what\'s happenin\' my human!',
	'yo',
	'hello',
	'hello there',
	'hey!',
	'What\'s up!',
	'I hear ya',
	'what!? I didn\'t realize I could actually hear anything!'
];
