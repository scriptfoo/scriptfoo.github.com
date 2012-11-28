define([
	'app/model/entity',
	'app/model/sprite/trees',
	'app/component/solid'
], function (EntityModel, TreesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': TreesSpriteModel,
			'sprite': 'TreeGreen', // Default to this type of tree
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
			entity.solid(40, 90, 12, 10);
		}
	});
});