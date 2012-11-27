define([
	'backbone',
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			'entity': null,
			'params': null
		},
		execute: function () {}
	});
});