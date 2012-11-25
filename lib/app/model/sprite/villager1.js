define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Villager1.png',
			'tilew' : 21,
			'tileh' : 48,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				IdleLeft: [0, 0],
				IdleRight: [1, 0],
				WalkLeft: [2, 0],
				WalkRight: [4, 0]
			},
		}
	});
});