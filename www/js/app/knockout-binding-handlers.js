;(function() {

	ko.bindingHandlers.vclick = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			function accessor() {
				return {'vclick': valueAccessor()};
			}
			var res = ko.bindingHandlers.event.init(element, accessor, allBindingsAccessor, viewModel, bindingContext);
			return res;
		}
	};

	ko.bindingHandlers.listview = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = valueAccessor();
			valueAccessor = ko.isObservable(value) ? value : valueAccessor;

			var res = ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
			$(element).listview();
			return res;
		},
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = valueAccessor();
			valueAccessor = ko.isObservable(value) ? value : valueAccessor;

			var res = ko.bindingHandlers.foreach.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
			$(element).listview('refresh');
			return res;
		}
	};

	ko.bindingHandlers.collapsibleset = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = valueAccessor();
			valueAccessor = ko.isObservable(value) ? value : valueAccessor;

			var res = ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
			$(element).collapsibleset();
			return res;
		},
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = valueAccessor();
			valueAccessor = ko.isObservable(value) ? value : valueAccessor;

			var res = ko.bindingHandlers.foreach.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
			$(element).collapsibleset('refresh');
			return res;
		}
	};

	ko.bindingHandlers.collapsible = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			valueAccessor();
			$(element).collapsible();
		}
	};

	ko.bindingHandlers.backgroundImage = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var observable = valueAccessor();
			var value = observable();
			if (!value) {
				return;
			}
			$(element).css('background-image', 'url(' + value + ')');
		}
	};
}());