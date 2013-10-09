;(function() {
	var app = window.app = window.app || {};

	var core = app.core = {
		pageHandlers: {},
		registerPageHandler: function(p_handler) {
			if (p_handler instanceof app.domain.PageHandler === false) {
				throw new Error('p_handler should be an instance of PageHandler');
			}

			var pageId = p_handler.pageId,
				pageHandlers = core.pageHandlers;
			if (pageHandlers[pageId]) {
				throw new Error('handler id ' + pageId + ' already registered');
			}
			
			app.log('registering page handler for pageId: ' + pageId);
			this.pageHandlers[pageId] = p_handler;
		},
		onPageInit: function(event) {
			var id = event.target.id,
				handler = core.pageHandlers[id],
				$element = $('#' + id);	
			if (handler) {
				//bind to element's events instead of directly calling the
				//method. this fixes problems with jQuery not reloading the
				//page after ko.cleanNode(element) is called
				$element.bind('pagebeforeshow', function() {
					handler.onPageBeforeShow();
				});
				$element.bind('pageshow', function() {
					handler.onPageShow();
				});
				$element.bind('pagehide', function() {
					handler.onPageHide();
					//unbind all event listeners from page element
					$element.unbind();
				});
			}
		},
		init: function() {
			$(document).bind('pageinit', core.onPageInit);
		},
	};

}());