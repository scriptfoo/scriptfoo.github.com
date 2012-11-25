define([
	'app/model/entity',
	'app/model/sprite/bunny'
], function (EntityModel, BunnySpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': BunnySpriteModel,
			'sprite': 'IdleLeft',
			'components': '2D, Canvas, SpriteAnimation',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.animate("walkLeft", 4, 0, 5)
				.animate("walkRight", 6, 0, 7)
				.animate("idleLeft", 0, 0, 1)
				.animate("idleRight", 2, 0, 3)
				.animate("idleLeft", 200, -1);
		},
	});
});