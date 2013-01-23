define([
	'backbone'
], function (
	Backbone
) {
	return Backbone.View.extend({
		events: {
			'click': 'onClick'
		},
		stateModel: null,
		toggleName: 'active',
		initialize: function (options) {
			_.bindAll(this);

			// Change the toggle name if one is passed in
			this.toggleName = options.toggleName || this.toggleName;

			this.stateModel = options.stateModel;
			this.stateModel.on('change:'+this.toggleName, this.onChange);
		},
		onClick: function () {
			this.stateModel.toggle();
		},
		onChange: function () {
			this.toggle();
		},
		toggle: function () {
			this.$el.toggleClass(this.toggleName, this.stateModel.get(this.toggleName));
		}
	});
});