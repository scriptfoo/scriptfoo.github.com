define([
	'app/model/entity',
	'app/model/sprite/foo',
	'crafty',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/playercontrols',
	'app/component/speaker',
	'app/component/rigidbody',
	'app/component/dynamicz',
	'app/component/announcer',
	'app/component/ping',
	'app/component/controllable'
], function (EntityModel, FooSpriteModel, Crafty) {
	return EntityModel.extend({
		_Interactor: null,
		defaults: {
			'health': 100.0,
			'level': 1,
			'spriteModel': FooSpriteModel,
			'sprite': 'Foo',
			'components': [
				'2D',
				'Canvas',
				'PlayerControls',
				'Speaker',
				'Rigidbody',
				'DynamicZ',
				'Announcer',
				'Ping', // This entity can cast a ping() :)
				'Controllable'
			],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		pack: null,
		postInit: function (entity) {
			_.bindAll(this);

			//setup animations
			entity.requires("SpriteAnimation")
				.animate("walkUp", 0, 0, 1)
				.animate("walkDown", 2, 1, 3)
				.animate("walkLeft", 0, 1, 1)
				.animate("walkRight", 2, 0, 3)
				.animate("idle", 0, 2, 0);

			this._Interactor = {
				hitbox: Crafty.e("2D, DOM, Collision, InteractorHitbox")
					.bind('KeyDown', _.bind(function(e) {
						if (e.key == Crafty.keys['E']) {
							this.interact();
						}
					}, this))
			};

			this._Interactor.hitbox.attr({
				h: entity._h,
				w: 20,
				x: entity._x + entity._w - 10,
				y: entity._y
			}).collision();

			entity.attach(this._Interactor.hitbox);

			entity.rigidbody();

			entity.bind("NewDirection", this._onNewDirection);
			entity.bind("Moved", this._onMove);
		},
		_onNewDirection: function (direction) {
			var entity = this.get('entity');

			/*if (!this.enabledControls) {
				entity.stop().animate("idle", 1, 1);
				return; // Make sure the others don't get triggered
			}*/

			if (direction.x < 0) {
				if (!entity.isPlaying("walkLeft")) {
					entity.stop().animate("walkLeft", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x - entity._w + 15,
						y: entity._y
					});
				}
			}
			else if (direction.x > 0) {
				if (!entity.isPlaying("walkRight")) {
					entity.stop().animate("walkRight", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x + entity._w - 10,
						y: entity._y
					});
				}
			}
			else if (direction.y < 0) {
				if (!entity.isPlaying("walkUp")) {
					entity.stop().animate("walkUp", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x + 5,
						y: entity._y - 10
					});
				}
			}
			else if (direction.y > 0) {
				if (!entity.isPlaying("walkDown")) {
					entity.stop().animate("walkDown", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x,
						y: entity._y + 15
					});
				}
			}
			else if(!direction.x && !direction.y) {
				entity.stop().animate("idle", 1, 1);
			}
		},
		_onMove: function (from) {
			var entity = this.get('entity');
			var newPosition = -(entity.y + (entity.h / 2) - (Crafty.viewport.height / 2));

			/*if(!this.enabledControls) {
				entity.attr({x: from.x, y:from.y});
				return;
			}*/

			if (newPosition > 0 || newPosition < -800) {
				return;
			}

			Crafty.viewport.scroll('_y', newPosition);
		},
		interact: function (SubjectModel) {
			if (arguments.length === 0) {
				// Check the hitbox
				if(this._Interactor.hitbox.hit('InteractableArea')) {
					this._Interactor
						.hitbox
						.hit('InteractableArea')[0]
						.obj._parent.Model
						.interact(this);
				}
			}
		},
		ping: function () {
			this.get('entity').ping();
		}
	});
});