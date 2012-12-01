define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Info.png',
			'tilew' : 20,
			'tileh' : 30,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				InfoSprite: [0, 0]
			},
		}
	});
});