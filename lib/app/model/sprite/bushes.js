define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/presprite/BushGreen.png',
			'tilew' : 36,
			'tileh' : 18,
			'paddingX': 0,
			'paddingY': 0,
			'elements': {
				BushGreen: [0, 0]
			},
		}
	});
});