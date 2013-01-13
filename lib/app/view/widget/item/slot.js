define([
	'backbone'
], function (
	Backbone
) {
	return Backbone.View.extend({
		tagName: 'li', // This widget represents the LI
		initialize: function (options) {
			_.bindAll(this);

			this.render();
		},
		render: function () {
			// @TODO: add logic to show the item in the slot if there is one
		}
	});
});