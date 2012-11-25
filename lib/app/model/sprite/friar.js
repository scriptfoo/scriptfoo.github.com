define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Friar.png',
			'tilew' : 21,
			'tileh' : 45,
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