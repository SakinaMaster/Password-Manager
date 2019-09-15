// > password-manager sakina$ npm init  //This installs a package.json file. It is a convenient way to create a package.json file.
// > password-manager sakina$ npm install node-persist@0.0.6 --save //node-persist save data locally.
// > password-manager sakina$ npm install yargs@3.15.0 --save
console.log("starting password manager");
//require() is a built-in node.js function.
//require() lets you access the module that you have installed.
var storage = require('node-persist'); //This is how you include third party files in your modules.
storage.initSync();	//Gets your computer ready to start writing and saving variables.

/*
//setItemSync() takes two arguments which are like key, value pair. It stores the variables
storage.setItemSync('accounts', [{
	userName: 'Sakina',
	balance: 0
}]);

//acc[] is the account array.
var acc = storage.getItemSync('accounts');

acc.push({
	userName: 'Jen',
	balance: 100
});

storage.setItemSync('accounts', acc);

console.log(acc);
*/


var command = require('yargs')
	.command('create', 'Creates a new account', function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (Eg: Twitter, Facebook)',
				type: 'string'
			},
			userName: {
				demand: true,
				alias: 'u',
				description: 'Account userName or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password goes here',
				type: 'string'
			}
		}).help('help')	//Gets help for specific command. This gets help for create command.
	})

	.command('get', 'Gets an existing account account by taking in a userName', function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (Eg: Twitter, Facebook)',
				type: 'string'
			}
		}).help('help')
	})
	.help('help')
	.argv

console.log(command);

//account.name  Facebook
//account.userName User12!
//account.password Password123
function createAccount (account) {
	var acc = storage.getItemSync('accounts');
	if (typeof acc === 'undefined') {
		acc = [];
	}

	acc.push(account);
	storage.setItemSync('accounts', acc);
	return account;
}

function getAccount (accountName) {
	var acc = storage.getItemSync('accounts');
	var matchedAccount;
	//forEach() takes a function as its one and only argument.
	//The function is called with each individual account.
	acc.forEach(function (account) {
		if(account.name === accountName) {
			matchedAccount = account;
		}
	});
	return matchedAccount;
}

if(command._[0] === 'create') {
	var createdAcc = createAccount({
		name: command.name,
		userName: command.userName,
		password: command.password
	});
	console.log('Account created!');
	console.log(createdAcc);
}
else if(command._[0] === 'get') {
	var getAccInfo = getAccount(command.name);

	if(typeof getAccInfo === 'undefined') {
		console.log('Account not found');
	}
	else {
		console.log('Account found!');
		console.log(getAccInfo);
	}
}
/*
createAccount({
	name: 'Facebook',
	userName: 'someemail@gmail.com',
	password: 'Password123'
});

var facebookAccount = getAccount('Facebook');
console.log(facebookAccount);
*/