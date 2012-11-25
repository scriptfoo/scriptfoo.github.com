define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Villager2.png',
			'tilew' : 24,
			'tileh' : 45,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				IdleLeft: [1, 0],
				IdleRight: [0, 0],
				WalkLeft: [2, 0],
				WalkRight: [4, 0]
			},
		}
	});
});