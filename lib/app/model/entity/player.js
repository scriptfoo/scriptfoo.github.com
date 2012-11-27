define([
	'app/model/entity',
	'app/model/sprite/foo',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/playercontrols',
	'app/component/speaker',
	'app/component/rigidbody',
	'app/component/dynamicz',
	'app/component/announcer'
], function (EntityModel, FooSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'health': 100.0,
			'level': 1,
			'spriteModel': FooSpriteModel,
			'sprite': 'Foo',
			'components': '2D, Canvas, PlayerControls, Speaker, Rigidbody, DynamicZ, Announcer',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			//setup animations
			entity.requires("SpriteAnimation")
				.animate("walkUp", 0, 0, 1)
				.animate("walkDown", 2, 1, 3)
				.animate("walkLeft", 0, 1, 1)
				.animate("walkRight", 2, 0, 3)
				.animate("idle", 0, 2, 0);

			entity.bind("NewDirection", function (direction) {
				if (direction.x < 0) {
					if (!entity.isPlaying("walkLeft"))
						entity.stop().animate("walkLeft", 20, -1);
				}
				if (direction.x > 0) {
					if (!entity.isPlaying("walkRight"))
						entity.stop().animate("walkRight", 20, -1);
				}
				if (direction.y < 0) {
					if (!entity.isPlaying("walkUp"))
						entity.stop().animate("walkUp", 20, -1);
				}
				if (direction.y > 0) {
					if (!entity.isPlaying("walkDown"))
						entity.stop().animate("walkDown", 20, -1);
				}
				if(!direction.x && !direction.y) {
					entity.stop().animate("idle", 1, 1);
				}
			});

			entity.bind("Moved", function (from) {
				var newPosition = -(entity.y + (entity.h / 2) - (Crafty.viewport.height / 2));

				if (newPosition > 0 || newPosition < -800) {
					return;
				}

				Crafty.viewport.scroll('_y', newPosition);
			});

			entity.playerControls(2)
				.rigidbody();
		},
		takeDamage: function (amount) {
			this.set('health', this.get('health') - amount);
		}
	});
});