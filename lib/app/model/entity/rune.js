define([
	'app/model/entity',
	'app/model/sprite/runes'
], function (EntityModel, RunesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': RunesSpriteModel,
			'sprite': 'RuneRed',
			'components': ['2D', 'Canvas'],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});