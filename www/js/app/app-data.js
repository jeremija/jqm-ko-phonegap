(function() {
	var app = window.app = window.app || {};
	var data = app.data = app.data || {};

	//data to be stored between pages
	var pageObjects = {};

	//gets the stored object
	data.getItem = function(p_name) {
		var obj = pageObjects[p_name];
		///elete pageObjects[p_name];
		return obj;
	};

	//saves the object with name
	data.setItem = function(p_name, p_object) {
		pageObjects[p_name] = p_object;
	};

	//deletes the stored object
	data.deleteItem = function(p_name) {
		return delete pageObjects[p_name];
	};

}());