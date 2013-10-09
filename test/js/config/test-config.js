;(function() {
	mocha.setup('bdd');

	var app = window.app = window.app || {};
	app.test = app.test || {};
	
	if (window.mochaPhantomJS) {
		//disable log in console output
		app.log = function() {};
		app.error = function() {};
		app.warn = function() {};

		//set the runner function
		app.test.run = function() {
			mochaPhantomJS.run();
		};
	}
	else {
		//set the runner function
		app.test.run = function() {
			mocha.run();
		};
	}

}());