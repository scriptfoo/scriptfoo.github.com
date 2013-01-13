define([
	'backbone',
	'app/view/widget/item/slots'
], function (
	Backbone,
	ItemSlotsWidget
) {
	return Backbone.View.extend({
		el: '.l-toolbar-runes',
		itemSlotsCollection: null,
		initialize: function (options) {
			_.bindAll(this);

			this.itemSlotsCollection = options.itemSlotsCollection;
			this.itemSlotsWidget = new ItemSlotsWidget({
				itemSlotsCollection: this.itemSlotsCollection
			});

			this.render();
		},
		render: function () {
			this.$el.html(this.itemSlotsWidget.$el);
		}
	});
});