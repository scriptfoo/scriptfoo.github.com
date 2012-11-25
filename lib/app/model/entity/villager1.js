define([
	'app/model/entity',
	'app/model/sprite/villager1'
], function (EntityModel, Villager1SpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': Villager1SpriteModel,
			'sprite': 'IdleLeft',
			'components': '2D, Canvas, SpriteAnimation, Solid',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.animate("walkLeft", 2, 0, 3)
				.animate("walkRight", 4, 0, 5)
				.animate("idleLeft", 0, 0, 0)
				.animate("idleRight", 1, 0, 1);
		},
	});
});