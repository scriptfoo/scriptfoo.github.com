define([
	'app/model/entity',
	'app/model/sprite/flowers'
], function (EntityModel, FlowersSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': FlowersSpriteModel,
			'sprite': 'FlowerBlue',
			'components': ['2D', 'Canvas'],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});