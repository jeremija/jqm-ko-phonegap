;(function() {

	describe('app-domain-test: Class', function() {
		var Class = app.domain.Class,
			classInstance;

		describe('Class constructor', function() {
			it('should have function extend', function() {
				expect(Class.extend).to.be.a('function');
			});
		});
		describe('creation of class instance', function() {
			it('should be ok', function() {
				classInstance = new Class();
				expect(classInstance).to.be.ok();
				expect(classInstance instanceof Class).to.be.ok();
			});
			it('should have logging methods', function() {
				expect(classInstance.getName).to.be.a('function');
				expect(classInstance.log).to.be.a('function');
				expect(classInstance.warn).to.be.a('function');
				expect(classInstance.error).to.be.a('function');
			});
			it('should log correctly', function() {
				classInstance.log('test log 1');
				classInstance.warn('test warn 1');
				classInstance.error('test error 1');
			});
		});
		describe('subclassing', function() {
			var Subclass,
				subclass;
			it('should extend without errors', function() {
				Subclass = Class.extend(function() {
					var self = this;
					self.property1 = 'value1';
					self.function1 = function() {};
				});
			});
			it('should instantiate without errors', function() {
				subclass = new Subclass();
			});
			it('should have defined properties and functions', function() {
				expect(subclass).to.have.property('property1');
				expect(subclass.function1).to.be.a('function');
			});
			it('should have inherited properties and functions', function() {			
				expect(subclass.getName).to.be.a('function');
				expect(subclass.log).to.be.a('function');
				expect(subclass.warn).to.be.a('function');
				expect(subclass.error).to.be.a('function');
			});
		});	
	});

	describe('app-domain-test: PageHandler', function() {
		//NOTE some tests are in app-core-test.js
		var PAGE_ID = 'a-page',
			PageHandler = app.domain.PageHandler;
		describe('constructor', function() {
			var handler;
			it('should throw error on no parameters', function() {
				expect(function() {
					handler = new PageHandler();
				}).to.throwError();
				expect(handler).to.not.be.ok();
			});
			it('should instnatiate correctly if pageId supplied', function() {
				handler = new PageHandler({
					pageId: PAGE_ID,
					onPageBeforeShow: function() {},
					onPageShow: function() {},
					onPageHide: function() {}
				});
				expect(handler).to.be.ok();
				expect(handler instanceof PageHandler).to.be(true);
			});
			it('should set the properties correctly (if supplied', function() {
				var VALUE = 'test-value',
					FUNCTION = function() {};
				handler = new PageHandler({
					pageId: PAGE_ID,
					onPageBeforeShow: function() {},
					onPageShow: function() {},
					onPageHide: function() {},
					properties: {
						prop1: VALUE,
						prop2: FUNCTION
					}
				});
				expect(handler).to.be.ok();
				expect(handler).to.have.property('prop1');
				expect(handler.prop1).to.be(VALUE);
				expect(handler).to.have.property('prop2');
				expect(handler.prop2).to.be.a('function');
				expect(handler.prop2).to.be(FUNCTION);
			});	
		});
	});

	describe('app-domain-test: KoPageHandler', function() {
		var PAGE_ID = 'some-page',
			KoPageHandler = app.domain.KoPageHandler,
			handler,
			vm = {},
			methods = {},
			calledOnPageBeforeShowCallback = false,
			calledOnPageShowCallback = false,
			calledOnPageHideCallback = false,
			onPageBeforeShow = function() {
				calledOnPageBeforeShowCallback = true;
			},
			onPageShow = function() {
				calledOnPageShowCallback = true;
			};
			onPageHide = function() {
				calledOnPageHideCallback = true;
			};
		before(function() {
			$('<div>').attr('id', PAGE_ID).appendTo('#test-div');
		});
		after(function() {
			$('#' + PAGE_ID).remove();
			var result = delete app.core.pageHandlers[PAGE_ID];
			expect(result).to.be(true);

		});
		describe('constructor', function() {
			it('should have method extend', function() {
				expect(KoPageHandler.extend).to.be.a('function');
				expect(KoPageHandler.extend).to.be(app.domain.Class.extend);
			});
			it('should throw error on no parameters', function() {
				expect(function() {
					handler = new KoPageHandler();
				}).to.throwError();
			});
			it('should instantiate without errors', function() {
				handler = new KoPageHandler({
					pageId: PAGE_ID
				});

				handler = new KoPageHandler({
					pageId: PAGE_ID,
					viewModel: vm,
					methods: methods,
					onPageBeforeShow: onPageBeforeShow,
					onPageShow: onPageShow,
					onPageHide: onPageHide
				});
			});
			it('should set the properties', function() {
				expect(handler.viewModel).to.be(vm);
				expect(handler.methods).to.be(methods);
				expect(handler.onPageBeforeShowCallback).to.be(onPageBeforeShow);
				expect(handler.onPageShowCallback).to.be(onPageShow);
				expect(handler.onPageHideCallback).to.be(onPageHide);
			});
		});
		describe('register()', function() {
			it('call method', function() {
				handler.register();
			});
			it('should be registered', function() {
				expect(app.core.pageHandlers).to.have.property(PAGE_ID);
			});
		});
		describe('onPageBeforeShow()' ,function() {
			it('call method', function() {
				handler.onPageBeforeShow();
			});
			it('should have applied konckout\'s bindings', function() {
				var element = document.getElementById(PAGE_ID);
				var res = ko.dataFor(element);
				expect(ko.dataFor(element)).to.be(vm);
			});
			it('should have called onPageBeforeShowCallback', function() {
				expect(calledOnPageBeforeShowCallback).to.be(true);
			});
		});
		describe('onPageShow()', function() {
			it('call method', function() {
				handler.onPageShow();
			});
			it('should have called onPageShowCallback', function() {
				expect(calledOnPageShowCallback).to.be(true);
			});
		});
		describe('onPageHide()', function() {
			it('call method', function() {
				handler.onPageHide();
			});
			it('should have cleared knockout\'s bindings', function() {
				var element = document.getElementById(PAGE_ID);
				expect(ko.dataFor(element)).to.not.be.ok();
			});
			it('should have called onPageHideCallback', function() {
				expect(calledOnPageHideCallback).to.be(true);
			});
		});
	});
}());