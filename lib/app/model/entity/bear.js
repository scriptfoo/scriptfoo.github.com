define([
	'app/model/entity',
	'app/model/sprite/bear',
	'app/component/solid',
	'app/component/announcer'
], function (EntityModel, BearSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': BearSpriteModel,
			'sprite': 'IdleLeft',
			'components': '2D, Canvas, SpriteAnimation, Solid, Speaker, Announcer',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.solid(0, 45, 30)
				.animate("walkLeft", 8, 0, 9)
				.animate("walkRight", 10, 0, 11)
				.animate("idleLeft", 0, 0, 3)
				.animate("idleRight", 4, 0, 7)
				.animate("idleLeft", 50, -1);
		},
	});
});