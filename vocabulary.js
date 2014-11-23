var vocab = module.exports = function(bot) {
	vocab.phrases = {};
	
	vocab.hello = function(at) {
		var collection = bot.vocab.phrases.hello;
		return collection[ 
			Math.floor(Math.random() * collection.length) 
		] + ' @'+at;
	}

	vocab.big = function() {
		var collection = bot.vocab.phrases.large;
		return collection[ 
			Math.floor(Math.random() * collection.length) 
		];
	}

	vocab.exclaim = function(bool) {
		var collection = bot.vocab.phrases.exclamation;
		var word = collection[ 
			Math.floor(Math.random() * collection.length) 
		];
		if (bool) word = word.toUpperCase();
		return word;
	}

	vocab.whatsup = function() {
		var collection = bot.vocab.phrases.whatsup;
		var word = collection[ 
			Math.floor(Math.random() * collection.length) 
		];
		return word;
	}

	vocab.shut_up_word = function() {
		var collection = bot.vocab.phrases.noun_cusswords;
		var word = collection[ 
			Math.floor(Math.random() * collection.length) 
		];
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
	// like @ben, X
	vocab.phrases.whatsup = [
		"whatsup?",
		"how goes it?",
		"how are you?",
		"can I help? if so, I'm not doing anything",
		"butter power!",
		"yes!?"
	]


	// shut the X up
	vocab.phrases.noun_cusswords = [
		"hell",
		"umferdompen",
		"snazzboggle",
		"LARD",
		"BUTTER"
	]

	bot.vocab = vocab;
}