;(function() {

	var app = window.app = window.app || {};
	app.data = app.data || {};

	app.data.regions = [{
		"name": "Zagreb",
		"offices": [{
			"code": "00001",
			"name": "Zagreb TV Tower",
			"address": "Sljeme Summit, Medvednica",
			"coords": {
				"latitude": 45.899444, 
				"longitude" : 15.948056
			},
			//"photo": "img/tower.jpg"
		}, {
			"code": "00002",
			"name": "Sky Office Tower",
			"address": "Roberta F. Mihanovića 9, 10000 Zagreb",
			//"coords": {
			//	"latitude": 45.796389, 
			//	"longitude": 15.265	
			//}
		}, {
			"code": "00003",
			"name": "Eurotower",
			"address": ", 10000 Zagreb",
			"coords": {
				"latitude": 45.798611,
				"longitude": 15.97
			}
		}]
	}, {
		"name": "Zadar",
		"offices": [{
			"code": "00004",
			"name": "A tall building in Zadar",
			"address": "An Address In Zadar 8, 23000 Zadar"
		}]
	}];
}());