define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Dog.png',
			'tilew' : 27,
			'tileh' : 30,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				IdleLeft: [0, 0],
				IdleRight: [12, 0],
				WalkLeft: [24, 0],
				WalkRight: [28, 0]
			}
		}
	});
});