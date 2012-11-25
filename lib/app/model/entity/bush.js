define([
	'app/model/entity',
	'app/model/sprite/bushes'
], function (EntityModel, BushesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': BushesSpriteModel,
			'sprite': 'BushGreen',
			'components': '2D, Canvas, Solid',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});