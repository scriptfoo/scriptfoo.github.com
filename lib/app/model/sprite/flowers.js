define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Flowers.png',
			'tilew' : 9,
			'tileh' : 15,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				FlowerBlue: [0, 0],
				FlowerPink: [1, 0]
			},
		}
	});
});