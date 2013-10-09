;(function() {
	var app = window.app = window.app || {};
	app.test = app.test || {};

	app.test.checkEventHandler = function (p_element, p_eventName, p_eventHandler) {
		var events = $._data(p_element, 'events');

		expect(events).to.have.property(p_eventName);
		events = events[p_eventName];

		for (var i in events) {
			var event = events[i];
			if (event.handler === p_eventHandler) {
				return true;
			}
		}

		return false;
	};

}());