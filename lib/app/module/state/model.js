define([
	'backbone'
], function (
	Backbone
) {
	return Backbone.Model.extend({
		defaults: {
			active: false
		},
		toggle: function () {
			this.set('active', !this.get('active'));
		}
	});
});