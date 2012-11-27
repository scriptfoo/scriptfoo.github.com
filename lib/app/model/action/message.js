define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			'type': null, // method/positive/negative
			'text': null
		}
	});
});