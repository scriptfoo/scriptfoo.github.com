define([
	'app/model/entity',
	'app/model/sprite/dog',
	'app/component/solid',
	'app/component/announcer'
], function (EntityModel, DogSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': DogSpriteModel,
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
			entity.solid(0, 20, 13)
				.animate("walkLeft", 24, 0, 27)
				.animate("walkRight", 28, 0, 31)
				.animate("idleLeft", 0, 0, 11)
				.animate("idleRight", 12, 0, 23)
				.animate("idleRight", 150, -1);
		},
		interact: function (Player) {
			this.announceAction('?!?!?!', 'negative');
		}
	});
});