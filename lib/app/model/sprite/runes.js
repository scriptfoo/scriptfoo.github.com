define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Runes.png',
			'tilew' : 6,
			'tileh' : 6,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				RuneBlue: [0, 0],   // Cobalt?
				RuneYellow: [1, 0], // Gold
				RuneGreen: [2, 0],  // Brass
				RuneRed: [3, 0]     // Copper
			},
		}
	});
});