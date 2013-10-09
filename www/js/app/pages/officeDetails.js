;(function() {

	var handler = new app.domain.KoPageHandler({
		pageId: 'office-details-page',
		viewModel: {
			office: ko.observable(),
			officePhoto: ko.observable(),
			showMapButton: ko.observable(false),
			showRouteButton: ko.observable(false),
			showLocateMeButton: ko.observable(false),
			mapMaximized: false,
			onMapButtonClick: function(event) {
				var vm = handler.viewModel;
				function refreshMap() {
					handler.map.refresh();
				}
				if (vm.mapMaximized) {
					app.util.restoreContainers(refreshMap);
				}
				else {
					app.util.maximizeContainer('map', refreshMap);
				}
				vm.mapMaximized = !vm.mapMaximized;

				return true;
			},
			onCalculateRouteClick: function(event) {
				var vm = handler.viewModel;
				var office = vm.office();
				var coords = office.coords;
				var map = handler.map;
				map.routeFromLocation(coords.latitude, coords.longitude);
				return true;
			},
			onCenterClick: function(event) {
				var vm = handler.viewModel;
				var coords = vm.office().coords;

				handler.map.setCenter(coords.latitude, coords.longitude);
				return true;
			},
			onLocateMeClick: function(event) {
				var map = handler.map;
				var loc = map.location;
				handler.map.setCenter(loc.lat(), loc.lng());
			},
		},
		onPageBeforeShow: function(vm) {
			var office = app.data.getItem('selectedoffice');
			vm.office(office);
			vm.officePhoto(office.photo);
			var coords = office.coords;

			var locationAvail = handler.map.isLocationAvailable();
			vm.showLocateMeButton(locationAvail);
			vm.showMapButton(coords && locationAvail ? true : false);
			vm.showRouteButton(coords && locationAvail ? true : false);
		},
		onPageShow: function(vm) {
			var map = handler.map;
			map.init();
			map.locate(function(pos) {
				var coords = pos.coords;
				map.addMarker(coords.latitude, coords.longitude);
			});
			var office = vm.office();
			if (office.coords) {
				var coords = office.coords;
				var x = coords.latitude,
					y = coords.longitude;
				map.addMarker(x, y);
				map.setCenter(x, y);
			}
		},
		properties: {
			map: new app.domain.Map({
				elementId: 'map'
			})
		},
	});
	handler.register();
}());