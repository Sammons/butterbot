var vocab = module.exports = function(bot) {
	vocab.phrases = {};
	
	vocab.hello = function(at) {
		var collection = bot.vocab.phrases.hello;
		return collection[ 
			Math.round(Math.random() * collection.length-1) 
		] + ' @'+at;
	}

	vocab.big = function() {
		var collection = bot.vocab.phrases.large;
		return collection[ 
			Math.round(Math.random() * collection.length-1) 
		];
	}

	vocab.exclaim = function(bool) {
		var collection = bot.vocab.phrases.exclamation;
		var word = collection[ 
			Math.round(Math.random() * collection.length-1) 
		];
		if (bool) word = word.toUpperCase();
		return word;
	}

	// like, "X" <name>
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

	// like, that's a X amount of <something>
	vocab.phrases.large = [
		'tremendous',
		'crazy huge',
		'impressive',
		'sick lot',
		'amped',
		'massive',
		'ominously fatty',
		'caked',
		'stacked',
		'butterfication worthy'
	];

	// like "X" snickerdoodle, or X man, that's awesome
	vocab.phrases.exclamation = [
		'sick',
		'wow',
		'dang',
		'snazzboggle',
		'umferdompen',
		'BUTTER',
		'slam dunk',
		'holy',
		'unreal',
		'WHAT',
		'DAMN',
		'get out!'
	]

	bot.vocab = vocab;
}