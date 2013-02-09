define([
	'app/model/entity',
	'app/model/sprite/dog',

	'app/component/solid',
	'app/component/announcer',
	'app/component/controllable'
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
				'Announcer',
				'Controllable'
			],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			_.bindAll(this);

			entity.requires("SpriteAnimation")
				.animate("walkLeft", 24, 0, 27)
				.animate("walkRight", 28, 0, 31)
				.animate("idleLeft", 0, 0, 11)
				.animate("idleRight", 12, 0, 23)
				.animate("idleRight", 150, -1);

			entity.bind("NewDirection", this._onNewDirection);
			entity.bind("Moved", this._onMove);
		},
		_onMove: function (from) {
			var entity = this.get('entity');
			var newPosition = -(entity.y + (entity.h / 2) - (Crafty.viewport.height / 2));

			if (newPosition > 0 || newPosition < -800) {
				return;
			}

			Crafty.viewport.scroll('_y', newPosition);
		},
		_onNewDirection: function (direction) {
			var entity = this.get('entity');

			if (direction.x < 0) {
				if (!entity.isPlaying("walkLeft")) {
					entity.stop().animate("walkLeft", 20, -1);
				}
			}
			else if (direction.x > 0) {
				if (!entity.isPlaying("walkRight")) {
					entity.stop().animate("walkRight", 20, -1);
				}
			}
			else if(!direction.x && !direction.y) {
				entity.stop().animate("idleRight", 150, -1);
			}
		},
		interact: function (Player) {
			this.announceAction('?!?!?!', 'negative');
		}
	});
});