define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Bear.png',
			'tilew' : 51,
			'tileh' : 72,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				IdleLeft: [0, 0],
				IdleRight: [4, 0],
				WalkLeft: [8, 0],
				WalkRight: [10, 0]
			},
		}
	});
});