define([
	'backbone'
], function (Backbone) {
	/**
	 * This is a model for each slot of your inventory. If the slot contains an
	 * item, the item model will be set.
	 */
	return Backbone.Model.extend({
		defaults: {
			itemModel: null
		}
	});
});