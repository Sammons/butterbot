var times = {};

function time_start(str) {
	times[str] = Date.now();
}

function time_since(str) {
	return Date.now() - (times[str] || 0);
}

module.exports = function(bot) {

	bot.on('hello', function(bot, from, target, message) {
		bot.send(target, bot.vocab.hello(from));
	})

	var variance = 2  * ( 1000 * 60 );
	var regular = 3 * (1000 * 60);
	var current_timeout = regular;
	bot.on('slackbot_spoke', function(bot, from, target, message) {
		if (time_since('slackbot_spoke') > current_timeout) {
			time_start('slackbot_spoke');
			current_timeout = regular + (Math.random() * variance);
			bot.send(target, 'shut the '+bot.vocab.shut_up_word()+' up @'+from);
		}
	})

	bot.on('math_exp', function(bot, from, target, message) {
		var number = eval(message.trim());
		var big_butter_threshold = 5;
		if (number > 5) {
			bot.send(target, bot.vocab.exclaim(true)+', '+number+' lbs is a '+bot.vocab.big()+' load of butter! @'+ from);
		}
		else {
			bot.send(target, number+'lbs of butter, @'+from);
		}
	})

	bot.on('mention', function(bot, from, target, message) {
		bot.send(target, '@'+from+', '+bot.vocab.whatsup());
	})

	bot.on('help', function(bot, from, target, message) {
		bot.send(target, '@'+from+
			', I can:\n'+
			'\t`melt <js>  ` <= eval js (you have the `say` function in scope)\n'+
			'\t`<math_expr>` <= eval math\n\t');
	})
}