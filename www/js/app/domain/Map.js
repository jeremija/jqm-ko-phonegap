;(function() {
	/*
	 * p_object expects:
	 *		elementId
	 */
	app.domain.Map = app.domain.Class.extend(function Map(p_object) {
		var self = this;

		self.elementId = p_object.elementId;
		self.googleMap = undefined;
		self.directionsDisplay = undefined;
		self.directionsService = new google.maps.DirectionsService();
		self.markers = [];

		var defaultLocation = //new google.maps.LatLng(34.0983425, -118.3267434);
			new google.maps.LatLng(45.8167, 15.9833);

		self.location = defaultLocation;

		self.getName = function() {
			return 'map (' + self.elementId + ')';
		};

		self.isLocationAvailable = function isLocationAvailable() {
			return navigator.geolocation ? true : false;
		};

		/*
		 * Adds the marker to the googleMap.
		 * @returns the google.Map.Marker instance
		 */
		self.addMarker = function addMarker(x, y) {
			if (!self.googleMap) {
				throw new Error('unable to add marker before init() call');
			}
			self.log('adding new marker (' + x + ', ' + y + ')');
			var marker = new google.maps.Marker({
				map: self.googleMap
			});
			marker.setPosition(new google.maps.LatLng(x, y));
			self.markers.push(marker);
			return marker;
		};

		self.removeAllMarkers = function removeAllMarkers() {
			var markers = self.markers;
			for(var i = markers.length - 1; i >= 0; i--) {
				var marker = markers.pop();
				marker.setMap(null);
			}
		};

		self.setLocation = function setLocation(x, y) {
			self.location = new google.maps.LatLng(x, y);
		};

		self.setCenter = function setCenter(x, y) {
			//self.location = new google.maps.LatLng(x, y);
			self.googleMap.setCenter(new google.maps.LatLng(x, y));
		};

		/*
		 * Tries to determine the current location and sets it to the
		 * self.location variable as an instance of google.maps.LatLng
		 */
		self._locate = 
				function _locate(highAccuracy, successCallback, errorCallback) {
			if (!self.isLocationAvailable()) {
				self.log('Location unavailable');
				return;
			}
			function success(pos) {
				var coords = pos.coords;
				self.log('successfully fetched position', pos);
				self.setLocation(coords.latitude, coords.longitude);
				if (successCallback) {
					successCallback(pos);
				}
			}
			function error(err) {
				self.error('error fetching position: ' + err.message);
				if (errorCallback) {
					errorCallback(err);
				}
			}
			navigator.geolocation.getCurrentPosition(success, error, {
				enableHighAccuracy: highAccuracy ? true : false,
				timeout: 5000
			});
		};

		self.locate = function locate(successCallback, errorCallback) {
			self._locate(true, successCallback, function(err) {
				self._locate(false, successCallback, errorCallback);
			});
		};

		self.init = function init() {
			self.directionsDisplay = new google.maps.DirectionsRenderer();

			var options = {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: defaultLocation,
				zoom: 14
			};

			var element = document.getElementById(self.elementId);
			var map = new google.maps.Map(element, options);
			self.googleMap = map;

			self.directionsDisplay.setMap(map);
		};

		function createRouteRequest(start, end) {
			return {
				origin: start,
				destination: end,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
		}

		/*
		 * Callback for self.directionsService.route method
		 */
		function handlerRouteResponse(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				self.directionsDisplay.setDirections(response);
			}
		}

		/*
		 * @param x		latitude in degrees
		 * @param y		longitude in degrees
		 */
		self.routeFromLocation = function route(x, y) {
			//self.removeAllMarkers();
			var request  = createRouteRequest(self.location, 
				new google.maps.LatLng(x, y));
			self.directionsService.route(request, handlerRouteResponse);
		};

		/*
		 * @param start		should be a google.maps.LatLng instance or a name of
		 *					the location
		 * @param end		should be a google.maps.LatLng instnace or a name of
		 *					the location
		 */
		self.routeStartEnd = function route(start, end) {
			var request = createRouteRequest(start, end);
			self.directionsService.route(request, handlerRouteResponse);
		};

		/*
		 * Triggers the 'resize' event on the self.googleMap object. Does
		 * nothing if self.map is not yet defined
		 */
		self.refresh = function refresh() {
			if (!self.googleMap) {
				return;
			}
			var googleMap = self.googleMap;
			google.maps.event.trigger(googleMap, 'resize');
		};
	});
}());