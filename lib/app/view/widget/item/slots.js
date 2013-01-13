define([
	'backbone',
	'app/view/widget/item/slot'
], function (
	Backbone,
	ItemSlotWidget
) {
	return Backbone.View.extend({
		tagName: 'ul', // This widget represents the UL
		itemSlotsCollection: null,
		initialize: function (options) {
			_.bindAll(this);

			this.itemSlotsCollection = options.itemSlotsCollection;

			this.render();
		},
		render: function () {
			this.itemSlotsCollection.each(this.appendSlot);
		},
		appendSlot: function (model) {
			var view = new ItemSlotWidget({
				slotModel: model
			});

			view.$el.appendTo(this.$el);

			return this;
		}
	});
});