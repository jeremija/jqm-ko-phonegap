
;(function() {
	window.app = window.app || {};
	var d = window.app.domain = window.app.domain || {};

	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}

	d.Class = function Class() {};

	d.Class.extend = function extend(p_constructor) {
		var Superclass = this;

		function F() {}
		F.prototype = Superclass.prototype;

		p_constructor.prototype = new F();
		p_constructor.prototype.constructor = p_constructor;
		p_constructor.extend = Superclass.extend;

		return p_constructor;
	};

	//override this method for logging details	
	d.Class.prototype.getName = function() {
		return this.constructor.name;
	};

	d.Class.prototype.log = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.getName() + '>');
		app.log.apply(app, args);
	};

	d.Class.prototype.warn = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.getName() + '>');
		app.warn.apply(app, args);
	};

	d.Class.prototype.error = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.getName() + '>');
		app.error.apply(app, args);
	};

	/*
	 * p_params expects:
	 *		pageId				an ID of the DOM element with attr 
	 *							data-role="page"
	 *		onPageBeforeShow	callback function to execute on jquery mobile's
	 *							onpagebeforeshow event
	 *		onPageShow			callback function to execute on jquery mobile's
	 *							onpageshow event
	 *		onPageHide			callback fucntion to execute on jquery mobile's
	 *							onpagehide event
	 * optional:
	 *		properties			useful properties or functions
	 */
	d.PageHandler = d.Class.extend(function PageHandler(p_params) {
		var self = this;

		if (!p_params) {
			throw new Error('invalid constructor p_params');
		}
		if (typeof p_params.pageId !== 'string') {
			throw new Error('pageId not defined or not a string');
		}
		if (typeof p_params.onPageBeforeShow !== 'function') {
			throw new Error('onPageBeforeShow not defined or not a function');
		}
		if (typeof p_params.onPageShow !== 'function') {
			throw new Error('onPageShow not defined or not a function');
		}
		if (typeof p_params.onPageHide !== 'function') {
			throw new Error('onPageHide not defined or not a function');
		}

		self.pageId = p_params.pageId;
		self.onPageBeforeShow = p_params.onPageBeforeShow;
		self.onPageShow = p_params.onPageShow;
		self.onPageHide = p_params.onPageHide;

		function setProperty(key, value) {
			if (self[key]) {
				throw new Error('Property already defined');
			}
			self[key] = value;
		}

		var properties = p_params.properties;
		for (var propName in properties) {
			setProperty(propName, properties[propName]);
		}

		self.getName = function() {
			return 'Handler \'' + self.pageId + '\'';
		};

		self.register = function() {
			app.core.registerPageHandler(self);
		};
	});

	/*
	 * p_params expects:
	 *		pageId		an Id of the DOM element with attr data-role="page"
	 * optional:
	 *		onPageBeforeShow	callback executed on page's pagebefore show
	 *							event. 
	 *							(viewModel, methods) passed as parameters
	 *		onPageShow			callback executed on page's pageinit event.
	 *							(viewModel, methods) passed as parameters
	 *		onPageHide			callback executed on page's pagehide event.
	 *							(viewModel, methods) passed as paramaters
	 *		methods				methods which will be accessible in callback
	 *							handlers
	 *		properties			@see PageHandler p_params documentation
	 */
	d.KoPageHandler = d.PageHandler.extend(function KoPageHandler(p_params) {
		var self = this;

		self.viewModel = p_params.viewModel || {};
		self.methods = p_params.methods || {};

		self.onPageBeforeShowCallback = p_params.onPageBeforeShow;
		self.onPageShowCallback = p_params.onPageShow;
		self.onPageHideCallback = p_params.onPageHide;

		d.PageHandler.call(self, {
			pageId: p_params.pageId,
			onPageBeforeShow: function() {
				var onPageBeforeShowCallback = self.onPageBeforeShowCallback,
					vm = self.viewModel;
				var pageElement = $('#' + self.pageId)[0];

				if (onPageBeforeShowCallback) {
					self.log('onPageBeforeShow() calling onPageBeforeShowCallback');
					onPageBeforeShowCallback(vm, self.methods);
				}

				self.log('onPageBeforeShow() applying ko bindings');
				ko.applyBindings(vm, pageElement);
			},
			onPageShow: function() {
				if (self.onPageShowCallback) {
					self.onPageShowCallback(self.viewModel, self.methods,
						self.properties);
				}
			},
			onPageHide: function() {
				self.log('onpagehide() cleaning ko node');
				var pageElement = $('#' + self.pageId)[0];

				if (self.onPageHideCallback) {
					self.onPageHideCallback(self.viewModel, self.methods, 
						self.properties);
				}
				
				//unbind all jquery event bindings from the page
				//$(pageElement).unbind();

				//clean knockout's memory
				ko.cleanNode(pageElement);

				//no need to do this, this will be removed by jqm, as long as page
				//cache is disabled.
				//pageElement.innerHTML = '';
			},
			properties: p_params.properties
		});
	});

}());