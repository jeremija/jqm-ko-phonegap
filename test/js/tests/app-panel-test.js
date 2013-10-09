;(function() {
	describe('app-panel-tets', function() {
		var origPanelFcn,
			origListviewFcn,
			panelCalled = false,
			panelArguments = null,
			listviewCalled = false;

		before(function() {
			//replace jquery's functions
			origPanelFcn = jQuery.fn.panel;
			origListviewFcn = jQuery.fn.listview;
			jQuery.fn.panel = function() {
				panelCalled = true;
				panelArguments = arguments;
			};
			jQuery.fn.listview = function() {
				listviewCalled = true;
			};

			//create fake panel
			var $div = $('<div>').attr('data-role', 'panel').
				attr('id', app.panel.ID).appendTo('#test-div');
			var $ul = $('<ul>').attr('id', app.panel.MENU_ID).appendTo($div);
			$('<a>').attr('name', 'page1').appendTo($ul);
			$('<a>').attr('name', 'page2').appendTo($ul);
		});

		beforeEach(function() {
			panelCalled = false;
			panelArguments = null;
			listviewCalled = false;
		});

		after(function() {
			//revert functions if they have existed
			jQuery.fn.panel = origPanelFcn;
			jQuery.fn.listview = origListviewFcn;

			//clean up the DOM
			$('#' + app.panel.ID).remove();
		});

		describe('app.panel object', function() {
			it('should be ok', function() {
				expect(app).to.be.ok();
				expect(app.panel).to.be.ok();
			});
			it('should have properties ID and MENU_ID', function() {
				expect(app.panel).to.have.property('ID');
				expect(app.panel).to.have.property('MENU_ID');
			});
			it('should have fcns init, show and markCurrentPage', function() {
				expect(app.panel.init).to.be.a('function');
				expect(app.panel.show).to.be.a('function');
				expect(app.panel.markCurrentPage).to.be.a('function');
			});
		});

		describe('init()', function() {
			it('call function', function() {
				app.panel.init();
			});
			it('should bind callback to document\'s pageinit event', function() {
				app.test.checkEventHandler(
					document, 'pageinit', app.panel.onPageInit);
			});
		});
		describe('onPageInit()', function() {
			it('onPageInit() should create a panel and it\'s listview', function() {
				app.panel.onPageInit();

				expect(panelCalled).to.be(true);
				expect(panelArguments.length).to.be(0);
				expect(listviewCalled).to.be(true);
			});
			it('should bind markCurrentPage to pageshow', function() {
				app.test.checkEventHandler(
					document, 'pageshow', app.panel.markCurrentPage);
			});
		});
		describe('show()', function() {
			it('should open the panel', function() {
				app.panel.show();

				expect(panelCalled).to.be(true);
				expect(panelArguments.length).to.be(1);
				expect(panelArguments[0]).to.be('open');
			});
		});
		describe('markCurrentPage()', function() {
			it('call function (page1)', function() {
				app.panel.markCurrentPage({
					target: {
						id: 'page1'
					}
				});
			});
			it('should mark a[name="page1"] as active', function() {
				var $menu = $('#' + app.panel.ID + ' #' + app.panel.MENU_ID);
				var $a1 = $menu.find('a[name="page1"]');
				var $a2 = $menu.find('a[name="page2"]');
				expect($a1.attr('class')).to.be('ui-btn-active');
				expect($a2.attr('class')).to.not.be.ok();
			});
			it('call function (page2)', function() {
				app.panel.markCurrentPage({
					target: {
						id: 'page2'
					}
				});
			});
			it('should mark a[name="page2 "] as active', function() {
				var $menu = $('#' + app.panel.ID + ' #' + app.panel.MENU_ID);
				var $a1 = $menu.find('a[name="page1"]');
				var $a2 = $menu.find('a[name="page2"]');
				expect($a1.attr('class')).to.be('');
				expect($a2.attr('class')).to.be('ui-btn-active');
			});
		});
		describe('TODO: onSwiperight', function() {
			it('TODO', function() {
				//TODO
			});
		});
	});
}());