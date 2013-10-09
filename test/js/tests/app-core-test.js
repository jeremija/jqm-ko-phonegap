;(function() {
	describe('app-core-test', function() {
		var pageHandler,
			PAGE_ID = 'a-test-page',
			calledOnPageBeforeShow = false,
			calledOnPageShow = false,
			calledOnPageHide = false;

		before(function() {
			$('<div>').attr('id', PAGE_ID).appendTo('#test-div');
		});

		after(function() {
			$('#' + PAGE_ID).remove();
			var result = delete app.core.pageHandlers['a-test-page'];
			expect(result).to.be(true);
		});

		describe('app.core object', function() {
			it('should have init() funciton', function() {
				expect(app.core.init).to.be.a('function');
			});
			it('call init()', function() {
				app.core.init();
			});
			it('should listen for document\'s pageinit event', function() {
				expect(app.test.checkEventHandler(
					document, 'pageinit', app.core.onPageInit)).to.be.ok();
			});
		});
		describe('app.core.registerPageHandler()', function() {
			it('should check for instance of pageHandler', function() {
				expect(function() {
					app.core.registerPageHandler({});
				}).to.throwError();
			});
			it('should add page handler successfully', function() {
				pageHandler = new app.domain.PageHandler({
					pageId: PAGE_ID,
					onPageBeforeShow: function() {
						calledOnPageBeforeShow = true;
					},
					onPageShow: function() {
						calledOnPageShow = true;
					},
					onPageHide: function() {
						calledOnPageHide = true;
					}
				});
				app.core.registerPageHandler(pageHandler);
			});
		});
		describe('app.core.onPageInit()', function() {
			it('call onPageInit()', function() {
				//fake pageinit event
				app.core.onPageInit({
					target: {
						id: PAGE_ID
					}
				});
			});
			it('should call handler.onPageBeforeShow on pagebeforeshow', function() {
				$('#' + PAGE_ID).trigger('pagebeforeshow');
				expect(calledOnPageBeforeShow).to.be(true);
			});
			it('should call handler.onPageShow on pageshow', function() {
				$('#' + PAGE_ID).trigger('pageshow');
				expect(calledOnPageShow).to.be(true);
			});
			it('should call handler.onPageHide on pagehide', function() {
				$('#' + PAGE_ID).trigger('pagehide');
				expect(calledOnPageHide).to.be(true);
			});
		});
	});
}());