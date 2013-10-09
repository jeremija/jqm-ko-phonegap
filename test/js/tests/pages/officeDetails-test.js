;(function() {
	describe('officeDetails-test', function() {
		var PAGE_ID = 'office-details-page',
			handler = null;
		describe('check if registered', function() {
			it('should be registered', function() {
				handler = app.core.pageHandlers[PAGE_ID];
				expect(handler).to.be.ok();
				expect(handler instanceof app.domain.KoPageHandler).to.be(true);
			});
		});
		describe('viewModel', function() {
			var vm = null;
			it('should be ok', function() {
				vm = handler.viewModel;
				expect(vm).to.be.ok();
			});
			it('should have office observable set', function() {
				expect(vm.office).to.be.ok();
				expect(ko.isObservable(vm.office)).to.be(true);
			});
			it('should have showMapButton observable set', function() {
				expect(vm.showMapButton).to.be.ok();
				expect(ko.isObservable(vm.showMapButton)).to.be(true);
			});
		});
		describe('onPageBeforeShow()', function() {
			var office = null;
			it('call function with office', function() {
				office = app.data.regions[0].offices[0];
				expect(office).to.have.property('coords');
				app.data.setItem('selectedoffice', office);
				handler.onPageBeforeShow(handler.viewModel);
			});
			it('should have set the office observable', function() {
				expect(handler.viewModel.office()).to.be(office);
			});
			it('should have set the showMapButton(true)', function() {
				expect(handler.viewModel.showMapButton()).to.be(true);
			});
			it('call function again (office without coords)', function() {
				office = app.data.regions[0].offices[1];
				expect(office).not.to.have.property('coords');
				app.data.setItem('selectedoffice', office);
				handler.onPageBeforeShow(handler.viewModel);
			});
			it('should have set the office observable', function() {
				expect(handler.viewModel.office()).to.be(office);
			});
			it('should have set the showMapButton(false)', function() {
				expect(handler.viewModel.showMapButton()).to.be(false);
			});
			it('clean up', function() {
				var retVal = app.data.deleteItem('selectedoffice');
				expect(retVal).to.be(true);
			});
		});
	});
}());