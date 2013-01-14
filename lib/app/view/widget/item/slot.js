define([
	'backbone'
], function (
	Backbone
) {
	return Backbone.View.extend({
		tagName: 'li', // This widget represents the LI
		slotModel: null,
		initialize: function (options) {
			_.bindAll(this);

			this.slotModel = options.slotModel;
			this.slotModel.on('change:itemModel', this.render);

			this.render();
		},
		render: function () {
			var itemModel = this.slotModel.get('itemModel');
			var itemName;
			this.$el
				.removeClass()
				.attr({
					title: null
				});

			if (itemModel) {
				itemName = itemModel.itemName().replace(' ', '-');
				this.$el.addClass('item-slot-'+itemName);
				this.$el.attr({
					title: itemModel.itemName()
				});
			}
		}
	});
});