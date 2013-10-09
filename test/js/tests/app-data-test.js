;(function() {
	describe('app-data-test', function() {
		describe('app.data object', function() {
			var ID = 'test-obj-id';
			it('should be ok', function() {
				expect(app).to.be.ok();
				expect(app.data).to.be.ok();
			});
			it('should have setItem function', function() {
				expect(app.data.setItem).to.be.a('function');
			});
			it('should have getItem function', function() {
				expect(app.data.getItem).to.be.a('function');
			});
			it('should have deleteItem function', function() {
				expect(app.data.deleteItem).to.be.a('function');
			});
			it('should be able to save and retrieve an object', function() {
				var obj = {
					a: '123',
					b: function() {}
				};
				app.data.setItem(ID, obj);
				var retrievedObj = app.data.getItem(ID);
				expect(retrievedObj).to.be(obj);
			});
			it('should delete an object', function() {
				var result = app.data.deleteItem(ID);
				expect(result).to.be(true);
				expect(app.data.getItem(ID)).to.be(undefined);
			});
		});
	});
}());