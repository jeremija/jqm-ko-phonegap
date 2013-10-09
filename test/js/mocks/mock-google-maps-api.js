;(function() {
	//mock navigator if it doesn't exist
	window.navigator = window.navigator || {};
	//mock geolocation API if it doesn't exist
	navigator.geolocation = navigator.geolocation || {};
	navigator.geolocation.shouldFail = false;
	navigator.geolocation.mockPosition = {
		coords: {
			latitude: 80,
			longitude: 53
		}
	};
	navigator.geolocation.mockError = new Error('mocked navigation error');
	navigator.geolocation.getCurrentPosition = function(success, error) {
		var shouldFail = navigator.geolocation.shouldFail;
		if (!shouldFail) {
			success(navigator.geolocation.mockPosition);
		}
		else {
			error(navigator.geolocation.mockError);
		}
	};

	window.google = {
		mock: {
			TEST_RESPONSE: 'TEST_RESPONSE'
		},
		maps: {
			LatLng: function(x, y) {
				var self = this;
				self.latitude = x;
				self.longitude = y;
				self.lat = function lat() {
					return self.latitude;
				};
				self.lng = function lng() {
					return self.longitude;
				};
			},
			Map: function(element, options) {
				var self = this;
				self.element = element;
				self.options = options;
				self.center = undefined;
				self.setCenter = function setCenter(position) {
					self.center = position;
				};
			},
			Marker: function() {
				var self = this;
				self.position = undefined;
				self.setPosition = function setPosition(position) {
					self.position = position;
				};
				self.setMap = function setMap(map) {
					self.map = map;
				};
			},
			MapTypeId: {
				ROADMAP: 'ROADMAP'
			},
			DirectionsTravelMode: {
				DRIVING: 'DRIVING'
			},
			DirectionsStatus: {
				OK: 'OK'
			},
			DirectionsService: function(){
				var self = this;
				self.lastRouteArguments = undefined;
				self.route = function route(request, callback) {
					self.lastRouteArguments = arguments;
					var response = google.mock.TEST_RESPONSE;
					callback(response, google.maps.DirectionsStatus.OK);
				};
			},
			DirectionsRenderer: function() {
				var self = this;
				self.map = undefined;
				self.lastDirectionsResponse = undefined;
				self.setMap = function setMap(p_map) {
					self.map = p_map;
				};
				self.setDirections = function(response) {
					self.lastDirectionsResponse = response;
				};
			},
			event: {
				trigger: function(object, name) {
					google.maps.event.lastTriggeredArguments = arguments;
				},
				lastTriggeredArguments: undefined
			}
		}
	};
}());