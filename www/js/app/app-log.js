;(function() {
	window.app = window.app || {};

	app.log = app.log || function() {
		if (!console || !console.log) {
			return;
		}
		var args = Array.prototype.slice.call(arguments);
		args.unshift('app.log:');
		console.log.apply(console, args);
	};

	app.warn = app.warn || function() {
		if (!console || !console.warn) {
			return;
		}
		var args = Array.prototype.slice.call(arguments);
		args.unshift('app.warn:');
		console.warn.apply(console, args);
	};

	app.error = app.error || function() {
		if (!console || !console.error) {
			return;
		}
		var args = Array.prototype.slice.call(arguments);
		args.unshift('app.error:');
		console.error.apply(console, args);
	};
}());