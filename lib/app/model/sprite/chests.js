define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Chests.png',
			'tilew' : 30,
			'tileh' : 18,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				ChestBlue: [0, 0],
				ChestRed: [1, 0]
			},
		}
	});
});