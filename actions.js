module.exports = function(bot) {

	bot.on('hello', function(bot, from, target, message) {
		bot.send(target, bot.vocab.hello(from));
	})

	bot.on('slackbot_spoke', function(bot, from, target, message) {
		bot.send(target, 'shut the hell up @'+from);
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
}