;(function() {
	describe('items-test', function() {
		var PAGE_ID = 'items-page',
			handler = null;
		describe('check if registered', function() {
			it('should be registered', function() {
				handler = app.core.pageHandlers[PAGE_ID];
				expect(handler).to.be.ok();
				expect(handler instanceof app.domain.KoPageHandler).to.be(true);
			});
		});
		describe('viewModel', function() {
			it('it should be ok', function() {
				expect(handler.viewModel).to.be.ok();
			});
			it('should have items observable array set', function() {
				var items = handler.viewModel.items;
				expect(items).to.be.ok();
				expect(ko.isObservable(items)).to.be.ok();
			});
			it('should have addItem function', function() {
				expect(handler.viewModel.addItem).to.be.a('function');
			});
			it('should add item', function() {
				var items = handler.viewModel.items(),
					len = items.length;
				handler.viewModel.addItem();
				expect(items.length).to.be(len + 1);
			});
			it('should have removeItem function', function() {
				expect(handler.viewModel.removeItem).to.be.a('function');
			});
			it('should remove item', function() {
				var items = handler.viewModel.items(),
					len = items.length;
				handler.viewModel.removeItem();
				expect(items.length).to.be(len - 1);
			});
		});
	});
}());