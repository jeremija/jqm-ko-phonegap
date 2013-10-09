;(function(){
	/*
	 * NOTE: This test uses a mocked google API and mocked navigator.geolocation
	 * see mock-google-maps-api.js for more details.
	 */
	describe('Map-test', function() {
		var map = null,
			ELEMENT_ID = 'map-element-id',
			params = {
				elementId: ELEMENT_ID,
			};
		before(function() {
			$('<div>').attr('id', ELEMENT_ID).appendTo('test-div');
		});
		after(function() {
			$('div#' + ELEMENT_ID).remove();
		});
		describe('constructor call', function() {
			it('should instantiate without problems', function() {
				map = new app.domain.Map(params);
				expect(map).to.be.ok();
				expect(map instanceof app.domain.Map).to.be(true);
			});
			it('should set default properties', function() {
				expect(map.elementId).to.be(params.elementId);
				expect(map.directionsService instanceof 
					google.maps.DirectionsService).to.be(true);
				expect(map.location instanceof
					google.maps.LatLng).to.be(true);
				expect(map.markers).to.be.ok();
				expect(map.markers.length).to.be(0);
				expect(map.getName()).to.be('map (' + map.elementId + ')');
			});
		});
		describe('isLocationAvailable()', function() {
			it('should determine if location available', function() {
				//should always be true because ofa mock-google-maps-api.js
				expect(map.isLocationAvailable()).to.be(true);
			});
		});
		describe('init()', function() {
			it('should create a new google.maps.Map instance', function() {
				map.init();
				var googleMap = map.googleMap;
				expect(googleMap instanceof google.maps.Map).to.be(true);

				var element = document.getElementById(ELEMENT_ID);
				expect(googleMap.element).to.be(element);
			});
			it('should set the directionsDisplay variable', function() {
				expect(map.directionsDisplay instanceof
					google.maps.DirectionsRenderer).to.be(true);
				expect(map.directionsDisplay.map).to.be(map.googleMap);
			});
		});
		describe('routeFromLocation()', function() {
			it('should send a route request to directionsService', 
					function() {
				var x = 3, y = 10;
				map.routeFromLocation(x, y);
				var routeArgs = map.directionsService.lastRouteArguments;
				expect(routeArgs).to.be.ok();
				var request = routeArgs[0],
					callback = routeArgs[1];
				expect(request).to.be.ok();
				expect(request.origin).to.be(map.location);
				expect(request.destination instanceof
					google.maps.LatLng).to.be(true);
				expect(request.destination.latitude).to.be(x);
				expect(request.destination.longitude).to.be(y);
				expect(callback).to.be.a('function');

				//clean up
				map.directionsService.lastRouteArguments = undefined;
			});
			it('should have called directionsDisplay.setDirections()', 
					function() {
				var res = map.directionsDisplay.lastDirectionsResponse;
				expect(res).to.be.ok();
				expect(res).to.be(google.mock.TEST_RESPONSE);

				//clean up
				map.directionsDisplay.lastDirectionsResponse = undefined;
			});
		});
		describe('addMarker()', function() {
			var x = 55,
				y = 93;
			it('should create a new google.maps.Marker instance', function() {
				var len = map.markers.length;
				map.addMarker(x, y);
				expect(map.markers.length).to.be(len + 1);
				var marker = map.markers[len];
				expect(marker).to.be.ok();
				expect(marker instanceof google.maps.Marker).to.be(true);
				var position = marker.position;
				expect(position).to.be.ok();
				expect(position instanceof google.maps.LatLng).to.be(true);
				expect(position.latitude).to.be(x);
				expect(position.longitude).to.be(y);
			});
		});
		describe('removeAllMarkers()', function() {
			var marker1,
				marker2,
				marker3;
			it('add some markers', function() {
				marker1 = map.addMarker(10, 15);
				marker2 = map.addMarker(18, 20);
				marker3 = map.addMarker(25, 13);
			});
			it('call function', function() {
				map.removeAllMarkers();
			});
			it('all markers should have no map set', function() {
				expect(marker1.map).to.not.be.ok();
				expect(marker2.map).to.not.be.ok();
				expect(marker2.map).to.not.be.ok();
			});
			it('should have cleared the markers array', function() {
				expect(map.markers.length).to.be(0);
			});
		});
		describe('setCenter()', function() {
			var x = 34,
				y = 99;
			it('should set the map\'s center variable', function() {
				map.setCenter(x, y);
				var googleMap = map.googleMap;
				var center = googleMap.center;
				expect(center).to.be.ok();
				expect(center instanceof google.maps.LatLng).to.be(true);
				expect(center.latitude).to.be(x);
				expect(center.longitude).to.be(y);
			});
		});
		describe('setLocation()', function() {
			it('should set the map.location object', function() {
				var x = 10,
					y = 11;
				map.setLocation(x, y);
				expect(map.location).to.be.ok();
				expect(map.location instanceof google.maps.LatLng).to.be(true);
				expect(map.location.latitude).to.be(x);
				expect(map.location.longitude).to.be(y);
			});
		});
		describe('locate()', function() {
			it('should call the successCallback on success', function() {
				navigator.geolocation.shouldFail = false;
				var position,
					error;
				map.locate(function(pos) {
					position = pos;
				}, function(err) {
					error = err;
				});
				var mockedPos = navigator.geolocation.mockPosition;
				expect(error).to.be(undefined);
				expect(position).to.be(mockedPos);
			});
			it('should have set the location accordingly', function() {
				var mockedCoords = navigator.geolocation.mockPosition.coords;
				expect(map.location.latitude).to.be(mockedCoords.latitude);
				expect(map.location.longitude).to.be(mockedCoords.longitude);
			});
			it('should call the errorCallback on error', function() {
				navigator.geolocation.shouldFail = true;
				var position,
					error;
				map.locate(function(pos) {
					position = pos;
				}, function(err) {
					error = err;
				});
				expect(position).to.be(undefined);
				expect(error).to.be(navigator.geolocation.mockError);
			});
		});
		describe('refresh()', function() {
			it('should trigger resize event on map.map object', function() {
				map.refresh();
				var triggered = google.maps.event.lastTriggeredArguments;
				expect(triggered[0]).to.be(map.googleMap);
				expect(triggered[1]).to.be('resize');

				//clean up
				google.maps.event.lastTriggeredArguments = undefined;
			});
		});
	});
}());