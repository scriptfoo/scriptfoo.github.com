define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			capture: null, // Variable names that need capturing
			callback: null // Send the callback you want to run
		},
		getVariablesToCapture: function () {
			return this.get('capture') || [];
		},
		execute: function (spell) {
			// Forward the call up to the callback, altering the scope
			this.get('callback').call(spell, this);
		}
	});
});