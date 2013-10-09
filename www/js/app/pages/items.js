;(function() {
	var handler = new app.domain.KoPageHandler({
		pageId: 'items-page',
		viewModel: {
			items: ko.observableArray([
				{
					name: ko.observable('Item 1'),
					description: ko.observable('This is a description of Item 1')
				}, {
					name: ko.observable('Item 2'),
					description: ko.observable('This is a description of Item 2')
				}
			]),
			addItem: function(){
				var vm = handler.viewModel,
					length = vm.items().length,
					id = length + 1;
				vm.items.push({
					name: ko.observable('Item ' + id),
					description: ko.observable('This is a description of Item ' + id)
				});
				return true;
			},
			removeItem: function() {
				var vm = handler.viewModel,
					length = vm.items().length;
				if (length > 0) {
					vm.items.pop();
				}
				return true;
			},
			editItem: function(data) {
				handler.viewModel.itemToEdit(data);
				$('#editItemPopup').popup('open', {transition: 'fade'});
			},
			itemToEdit: ko.observable(),
		},
		methods: {

		}
	});

	handler.register();
}());