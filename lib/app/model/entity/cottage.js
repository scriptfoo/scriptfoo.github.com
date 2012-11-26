define([
	'app/model/entity',
	'app/model/sprite/cottages',
	'app/component/solid'
], function (EntityModel, CottagesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': CottagesSpriteModel,
			'sprite': 'CottageBrown',
			'components': '2D, Canvas, Solid',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.solid(0, 60, 30);
		}
	});
});