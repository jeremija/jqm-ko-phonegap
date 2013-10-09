;(function() {
	var app = window.app = window.app || {};

	app.core.init();
	app.panel.init();

	app.init = function() {
		app.log('app.init() START');
		//hide the loading/waiting overlay
		app.log('jQuery hiding #loading');
		$('#loading').fadeOut();

		app.log('app.init() END');
	};

	//listen for cordova/phonegap's ready event
	app.log('listening for deviceready event');
	$(document).on('deviceready', function() {
		app.log('deviceready event callback: calling app.init()');
		app.init();
	});

}());