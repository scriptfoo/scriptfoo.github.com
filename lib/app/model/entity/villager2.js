define([
	'app/model/entity',
	'app/model/sprite/villager2',
	'app/component/solid',
	'app/component/announcer'
], function (EntityModel, Villager2SpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': Villager2SpriteModel,
			'sprite': 'IdleLeft',
			'components': [
				'2D',
				'Canvas',
				'SpriteAnimation',
				'Solid',
				'Speaker',
				'Announcer'
			],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.solid(0, 30, 15);
			entity.animate("walkLeft", 2, 0, 3)
				.animate("walkRight", 4, 0, 5)
				.animate("idleLeft", 0, 0, 1)
				.animate("idleRight", 0, 0, 1)
				.animate("idleLeft", 220, -1);
		},
	});
});