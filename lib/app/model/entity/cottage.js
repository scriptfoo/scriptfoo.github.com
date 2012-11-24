define([
	'app/model/entity',
	'app/model/sprite/cottages'
], function (EntityModel, CottagesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': CottagesSpriteModel,
			'sprite': 'CottageBrown',
			'components': '2D, Canvas',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});