;(function() {

	var app = window.app = window.app || {};

	var panel = app.panel = {
		ID: 'leftPanel',
		MENU_ID: 'myPanelMenu',
		markCurrentPage: function(event) {
			var pageId = event.target.id;
			var $menu = $('#' + panel.MENU_ID);
			$menu.find('a').removeClass('ui-btn-active');
			$menu.find('a[name="' + pageId + '"]').addClass('ui-btn-active');
		},
		show: function(event) {
			if (event) {
				event.preventDefault();
			}
			$('#' + panel.ID).panel('open');
		},
		hide: function(event) {
			if (event) {
				event.preventDefault();
			}
			$('#' + panel.ID).panel('close');
		},
		onSwiperight: function(event) {
			var x = event.swipestart.coords[0];
			if (x < 10) {
				panel.show();
			}
		},
		onPageInit: function(event) {
			$('#' + panel.ID).panel();
			$('#' + panel.MENU_ID).listview();

			$(document).on('pageshow', panel.markCurrentPage);
				
			//$('[data-role="page"]').on('swiperight', panel.onSwiperight);

			$('[data-custom="showLeftPanel"]').on('vclick', panel.show);
		},
		init: function() {
			$(document).on('pageinit', panel.onPageInit);
			$(window).resize(function() {
				panel.hide();
			});
			$('#' + panel.MENU_ID).find('a').on('vclick', function(event) {
				event.preventDefault();
				var href = $(this).attr('href');
				$.mobile.changePage(href);
			});
		}
	};

}());