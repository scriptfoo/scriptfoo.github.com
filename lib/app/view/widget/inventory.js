define([
	'backbone'
], function (Backbone) {
	return Backbone.View.extend({
		itemSlotsCollection: null,
		initialize: function (options) {
			_.bindAll(this);

			this.itemSlotsCollection = options.itemSlotsCollection;
		}
	});
});