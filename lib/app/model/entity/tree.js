define([
	'app/model/entity',
	'app/model/sprite/trees'
], function (EntityModel, TreesSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': TreesSpriteModel,
			'sprite': 'TreeGreen', // Default to this type of tree
			'components': '2D, Canvas',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		}
	});
});