define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Trees.png',
			'tilew' : 87,
			'tileh' : 102,
			'paddingX': 11,
			'paddingY': 11,
			'elements': {
				TreeOlive: [0, 0],
				TreeGreen: [1, 0]
			},
		}
	});
});