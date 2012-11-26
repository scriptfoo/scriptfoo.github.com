define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		baseDuration: 2000,
		defaults: {
			'speaker': null,
			'text': null,
			'duration': null, // When not passed in, we calculate it
			'callback': null
		},
		initialize: function () {
			if (this.get('duration') === null) {
				// Base duration + a second for every 20 characters
				this.set('duration', this.baseDuration + (this.get('text').length / 20 * 1000));
			}
		}
	});
});