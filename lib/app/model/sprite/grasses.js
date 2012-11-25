define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Grasses.png',
			'tilew' : 1, // Each grass piece is a unique size so ignore this
			'tileh' : 1,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				GrassAreaLarge: [0, 0, 222, 57],
				GrassAreaSmall: [250, 0, 141, 45],
				GrassAreaTall: [500, 0, 93, 42]
			},
		}
	});
});