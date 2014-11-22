var vm = require('vm');

var say_invoked = false;
var who = '00';
var say = function(thing) {
	if (say_invoked) return;
	say_invoked = true;
	try {
		console.log
		process.send({data: JSON.stringify(thing)});
	} 
	catch (e) 
	{
		process.send({ data: who+'no luck' });
	}
}

var context_var = {
	globalVar : {},
	say : say
};

var context = vm.createContext(context_var);

var read = function(thing) {
	say_invoked = false;
	console.log('thing we want to execute:',thing);
	// var script = vm.createScript(thing, 'myfile.vm');
	var script = new vm.Script(''+thing);
	var result = script.runInNewContext(context);
	if (result) say(result);
}


setInterval(function() {
	process.send({ data: '__buggerydemons__' });
},500);

process.on('message', function(d) {
	var m = d.data+ '\n';
	who = m.substring(0,2)/1;
	who = m.substring(2);
	read(m);
})