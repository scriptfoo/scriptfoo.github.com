define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/StarGreen.png',
			'tilew' : 32,
			'tileh' : 31,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				StarGreenSprite: [0, 0]
			},
		}
	});
});