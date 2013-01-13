define([
	'backbone',
	'app/model/item/slot'
], function (Backbone, ItemSlotModel) {
	return Backbone.Collection.extend({
		model: ItemSlotModel,
		initialize: function (models, options) {
			var i = models.length;
			var x = options.size;

			for (; i < options.size; i++) {
				models.push({}); // Add an empty slot model
			}
		},
		addItem: function (itemModel, position) {
			this.at(position).set('itemModel', itemModel);
		}
	});
});