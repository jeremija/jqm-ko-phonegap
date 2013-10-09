;(function() {
	var app = window.app = window.app || {};
	app.util = {
		getRealContentHeight: function getRealContentHeight() {
			var header = $.mobile.activePage.find(
				"div[data-role='header']");
			var footer = $.mobile.activePage.find(
				"div[data-role='footer']");
			var content = $.mobile.activePage.find(
				"div[data-role='content']");
			var viewport_height = $(window).height();

			var content_height = 
				viewport_height - header.outerHeight() - footer.outerHeight();
			if((content.outerHeight() - 
				header.outerHeight() - 
				footer.outerHeight()) <= viewport_height) {
				content_height -= (content.outerHeight() - content.height());
			}
			return content_height;
		},
		maximizeContainer: function(id, callback) {
			function enlargeSingleContainer() {
				$container = $('#' + id);
				$container.addClass('maximized');
				$container.each(function() {
					this.lastHeight = $(this).height();
				});
				$container.animate({
					height: app.util.getRealContentHeight()
				}, 400, 'swing', callback);
			}
			function hideContainers(p_callback) {
				var $containers = $(':not(#' + id + ').container');
				//remember last height
				$containers.each(function() {
					this.lastHeight = $(this).height();
				});
				$containers.animate({
					height: 0
				}, 400, 'swing', function() {
					$containers.hide();
					p_callback();
				});
			}
			hideContainers(function() {
				enlargeSingleContainer();
			});
		},
		restoreContainers: function(callback) {
			var $containers = $('.container');
			var num = $containers.length,
				count = 0;
			$containers.removeClass('maximized');
			$containers.each(function() {
				$(this).show().animate({
					height: this.lastHeight ? this.lastHeight : '15em'
				}, 400, 'swing', function() {
					count++;
					if (count === num) {
						callback();
					}
				});
			});
		}
	};
}());