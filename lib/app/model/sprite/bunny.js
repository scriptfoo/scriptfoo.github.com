define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Bunny.png',
			'tilew' : 18,
			'tileh' : 33,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				IdleLeft: [0, 0],
				IdleRight: [2, 0],
				WalkLeft: [4, 0],
				WalkRight: [6, 0]
			},
		}
	});
});