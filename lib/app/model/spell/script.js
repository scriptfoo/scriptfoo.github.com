define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			'name' : null,
			'code' : null
		},
		triggerCastEvent: function () {
			this.trigger('cast', this);
		}
	});
});