;(function() {
	var handler = new app.domain.KoPageHandler({
		pageId: 'offices-page',
		viewModel: {
			regions: ko.observableArray(app.data.regions),
			officeClick: function(data) {
				app.data.setItem('selectedoffice', data);

				//execute the default onclick action (follow href)
				return true;
			}
		}
	});
	handler.register();
}());