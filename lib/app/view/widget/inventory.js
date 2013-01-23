define([
	'backbone',
	'app/view/widget/item/slots'
], function (
	Backbone,
	ItemSlotsWidget
) {
	return Backbone.View.extend({
		el: '.widget-inventory',
		itemSlotsCollection: null,
		stateModel: null,
		initialize: function (options) {
			_.bindAll(this);

			this.itemSlotsCollection = options.itemSlotsCollection;
			this.itemSlotsWidget = new ItemSlotsWidget({
				itemSlotsCollection: this.itemSlotsCollection
			});

			this.stateModel = options.stateModel;
			this.stateModel.on('change:active', this.onStateChange);

			this.onStateChange();

			this.render();
		},
		render: function () {
			this.$el.html(this.itemSlotsWidget.$el);
		},
		onStateChange: function () {
			this.$el.toggleClass('open', this.stateModel.get('active'));
		}
	});
});