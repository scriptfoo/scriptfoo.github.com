define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Weeds.png',
			'tilew' : 21,
			'tileh' : 12,
			'paddingX': 11,
			'paddingY': 11,
			'elements': {
				WeedDark: [0, 0],
				WeedBright: [1, 0]
			},
		}
	});
});