define([
	'app/model/entity',
	'app/model/sprite/chests',
	'app/component/solid'
], function (EntityModel, ChestsSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': ChestsSpriteModel,
			'sprite': 'ChestRed',
			'components': [
				'2D',
				'Canvas',
				'Solid'
			],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.solid(0, 8, 10);
		}
	});
});