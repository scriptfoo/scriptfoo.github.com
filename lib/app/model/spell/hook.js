define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			runOnce: true, // Automatically remove this model from the collection
			capture: null, // Variable names that need capturing
			callback: null // Send the callback you want to run
		},
		getVariablesToCapture: function () {
			return this.get('capture') || [];
		},
		execute: function (spell) {
			// Forward the call up to the callback
			this.get('callback').call(spell, spell, this);
		}
	});
});