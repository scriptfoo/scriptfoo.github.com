define([
	'app/model/entity',
	'app/model/sprite/foo',
	'app/collection/item/slots',
	'crafty',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/playercontrols',
	'app/component/speaker',
	'app/component/rigidbody',
	'app/component/dynamicz',
	'app/component/announcer',
	'app/component/ping'
], function (EntityModel, FooSpriteModel, ItemSlotsCollection, Crafty) {
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
				'Ping' // This entity can cast a ping() :)
			],
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		enabledControls: true,
		pack: null,
		postInit: function (entity) {
			_.bindAll(this);

			// The collection that holds item models in your backpack
			this.pack = new ItemSlotsCollection([], {
				size: 40
			});
			// And the collection of runes on your 'belt' (shortcuts)
			this.runeBelt = new ItemSlotsCollection([], {
				size: 5
			});

			//setup animations
			entity.requires("SpriteAnimation, Keyboard")
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

			entity.bind("NewDirection", this._onNewDirection);
			entity.bind("Moved", this._onMove);

			entity.playerControls(2)
				.rigidbody();
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
			if (direction.x > 0) {
				if (!entity.isPlaying("walkRight")) {
					entity.stop().animate("walkRight", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x + entity._w - 10,
						y: entity._y
					});
				}
			}
			if (direction.y < 0) {
				if (!entity.isPlaying("walkUp")) {
					entity.stop().animate("walkUp", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x + 5,
						y: entity._y - 10
					});
				}
			}
			if (direction.y > 0) {
				if (!entity.isPlaying("walkDown")) {
					entity.stop().animate("walkDown", 20, -1);

					// Update the interactor collider
					this._Interactor.hitbox.attr({
						x: entity._x,
						y: entity._y + 15
					});
				}
			}
			if(!direction.x && !direction.y) {
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
		disableControls: function () {
			this.enabledControls = false;
		},
		enableControls: function () {
			this.enabledControls = true;
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
		},
		addToPack: function (itemModel, position) {
			this.pack.addItem(itemModel, position);
		},
		addToRuneBelt: function (itemModel, position) {
			this.runeBelt.addItem(itemModel, position);
		},
		_movement: {x: 0, y: 0},
		_direction: null,
		_speed: {x: 2, y: 2},
		/**
		 * Move the player given a direction and duration
		 * @param  {string}   direction UP/DOWN/LEFT/RIGHT
		 * @param  {integer}  duration  how long to move, in seconds
		 * @param  {function} callback  function to call on move completion
		 */
		move: function (direction, duration, callback) {
			direction = direction.toUpperCase();
			duration = duration || 1000;

			switch(direction)
			{
				case 'UP':
					this._direction = -90;
				break;
				case 'DOWN':
					this._direction = 90;
				break;
				case 'RIGHT':
					this._direction = 0;
				break;
				case 'LEFT':
					this._direction = 180;
				break;
				default:
					// do something
					return;
			}

			this._movement.x = Math.round(Math.cos(this._direction * (Math.PI / 180)) * 1000 * this._speed.x) / 1000;
			this._movement.y = Math.round(Math.sin(this._direction * (Math.PI / 180)) * 1000 * this._speed.y) / 1000;

			this.get('entity').trigger('NewDirection', this._movement);

			Crafty.bind("EnterFrame", this._doMove);

			setTimeout(_.bind(function () {
				Crafty.unbind("EnterFrame", this._doMove);
				this.get('entity').trigger('NewDirection', {x: 0, y: 0});
				callback();
			}, this), duration);
		},
		/**
		 * Function bound to the 'EnterFrame' event for moving the player
		 */
		_doMove: function () {
			var entity = this.get('entity');

			if (this._movement.x !== 0) {
				entity.x += this._movement.x;
				entity.trigger('Moved', { x: entity.x - this._movement.x, y: entity.y });
			}
			if (this._movement.y !== 0) {
				entity.y += this._movement.y;
				entity.trigger('Moved', { x: entity.x, y: entity.y - this._movement.y });
			}
		}
	});
});