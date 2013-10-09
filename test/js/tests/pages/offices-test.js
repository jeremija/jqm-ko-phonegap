;(function() {
	describe('offices-test', function() {
		var PAGE_ID = 'offices-page',
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
				expect(handler.viewModel).to.be.ok();
				vm = handler.viewModel;
			});
			it('should have regions observable array', function() {
				expect(vm.regions).to.be.ok();
				expect(ko.isObservable(vm.regions)).to.be(true);
			});
			it('should have officeClick function', function() {
				expect(vm.officeClick).to.be.a('function');
			});
			it('should setItem to data on executing and return true', function() {
				var data = 'blabla'; 
				var retVal = vm.officeClick(data);
				var data2 = app.data.getItem('selectedoffice');
				expect(data2).to.be(data);
				//to follow the jquery's click bindings
				expect(retVal).to.be(true);
				//clean up
				retVal = app.data.deleteItem('selectedoffice');
				expect(retVal).to.be(true);
			});
		});
	});
}());