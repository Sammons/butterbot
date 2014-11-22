module.exports = function(bot) {

	bot.on('hello', function(bot, target, message) {
		bot.send(target, bot.vocab.hello());
	})
}