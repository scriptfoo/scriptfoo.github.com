define([
	'app/model/entity',
	'app/model/sprite/grasses'
], function (EntityModel, GrassesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': GrassesSpriteModel,
			'sprite': 'GrassAreaLarge',
			'components': '2D, Canvas',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});