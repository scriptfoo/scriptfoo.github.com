define([
	'app/model/entity',
	'app/model/sprite/weeds'
], function (EntityModel, WeedsSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': WeedsSpriteModel,
			'sprite': 'WeedDark', // Default to this type of weed
			'components': ['2D', 'Canvas'],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});