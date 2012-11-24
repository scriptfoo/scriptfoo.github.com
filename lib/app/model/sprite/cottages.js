define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/Cottages.png',
			'tilew' : 108,
			'tileh' : 93,
			'paddingX': 12,
			'paddingY': 12,
			'elements': {
				CottageMaroon: [0, 0],
				CottageBrown: [1, 0]
			},
		}
	});
});