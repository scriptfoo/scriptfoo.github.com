define([
	'backbone',
	'crafty'
], function (Backbone, Crafty) {
	return Backbone.Model.extend({
		defaults: {
			'file' : null,
			'tilew' : null,
			'tileh' : null,
			'elements': {},
		},
		/**
		 * Creates the sprite in Crafty
		 */
		create: function () {
			var model = this.toJSON();

			Crafty.sprite(
				model['tilew'] || model['tileh'], // Default to matching the height
				model['tileh'],
				model['file'],
				model['elements'],
				model['paddingX'],
				model['paddingY']
			);

			return this;
		}
	});
});