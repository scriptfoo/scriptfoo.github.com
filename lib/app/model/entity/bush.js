define([
	'app/model/entity',
	'app/model/sprite/bushes',
	'app/component/solid'
], function (EntityModel, BushesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': BushesSpriteModel,
			'sprite': 'BushGreen',
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