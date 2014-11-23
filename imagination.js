var vm = require('vm');

var say_invoked = false;
var who = '00';

var say = function(thing) {
	if (thing)
	process.send({data: who+thing});
}


var clear = function() {
	process.exit(0);
}

var context = vm.createContext();

context.say = say;
context.clear = clear;
context.setInterval = setInterval;

var read = function(thing) {
	say_invoked = false;
	console.log('thing we want to execute:',thing);
	var script = new vm.Script(thing, 'myfile.vm');
	var result = script.runInNewContext(context);
	if (result)
	process.send({data: who+''+result});
}


setInterval(function() {
	process.send({ data: '__buggerydemons__' });
},500);

process.on('message', function(d) {
	var m = (d.data ||'')+ '\n';
	who = m.substring(0,2);
	m = m.substring(2);
	read(m);
})