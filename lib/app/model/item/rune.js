define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			type: null
		},
		itemName: function () {
			return this.get('type') + ' ' + 'rune';
		}
	});
});