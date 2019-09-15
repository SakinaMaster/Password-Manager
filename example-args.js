
//Command: npm install yargs@3.15.0 --save

//.argv lets us get all the arguments passed to the program.

/*-----------------------------------

var command = require('yargs').argv;  
console.log(command); 

if(command._[0] === 'hello' && typeof command.firstName !== 'undefined' && typeof command.lastName !== 'undefined') {
	console.log('Hello ' + command.firstName + ' ' + command.lastName + '!');
}
else if (command._[0] === 'hello' && typeof command.firstName !== 'undefined') {
	console.log('Hello ' +  command.firstName + '!');
}
else if(command._[0] === 'hello') {
	console.log('Hello World!');
}

------------------------------------*/

var command = require('yargs')
	//.command() takes three arguments. 
	.command('hello', 'Greets the user', function(yargs) {
		//options({}) is a function and it takes one argument which is an object.
		yargs.options({
			firstName: {		//firstName is the object.
				demand: true,
				alias: 'n',
				description: 'Your first name goes here',
				type: 'string'
			},
			lastName: {
				demand: true,
				alias: 'l',
				description: 'Your ;ast name goes here',
				type: 'string'
			}
		}).help('help')
	})
	.help('help') //help() takes one argument which is a string.
	.argv;

console.log(command); 

if(command._[0] === 'hello' && typeof command.firstName !== 'undefined' && typeof command.lastName !== 'undefined') {
	console.log('Hello ' + command.firstName + ' ' + command.lastName + '!');
}
else if (command._[0] === 'hello' && typeof command.firstName !== 'undefined') {
	console.log('Hello ' +  command.firstName + '!');
}
else if(command._[0] === 'hello') {
	console.log('Hello World!');
}
