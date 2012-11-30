define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Ping.png',
			'tilew' : 300,
			'tileh' : 300,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				PingSprite: [27, 0]
			},
		}
	});
});