define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c("Controllable", {
		init: function() {
			_.bindAll(this);
		},
		_enabledControls: false,
		_enabledMovement: false,
		disableControls: function () {
			this.unbind("KeyDown", this._keydown)
				.unbind("KeyUp", this._keyup);

			this.enabledControls = false;
		},
		enableControls: function () {
			this.bind("KeyDown", this._keydown)
				.bind("KeyUp", this._keyup);

			this.enabledControls = true;
		},
		_movement: {x: 0, y: 0},
		_direction: null,
		_speed: {x: 2, y: 2},
		_keysDown: 0,
		_keys: {
			'W': {dir: -1},
			'S': {dir: 1},
			'D': {dir: 1},
			'A': {dir: -1}
		},
		_keydown: function (e) {
			var key = String.fromCharCode(e.key);
			if (this._keys.hasOwnProperty(key)) {

				if (key == 'A' || key == 'D') {
					this._movement.x += (this._keys[key].dir * this._speed.x);
				} else if (key == 'W' || key == 'S') {
					this._movement.y += (this._keys[key].dir * this._speed.y);
				}

				this.trigger('NewDirection', {x: this._movement.x, y: this._movement.y});

				if (!this._keysDown)
				{
					Crafty.bind("EnterFrame", this._doMove);
				}

				this._keysDown++;
			}
		},
		_keyup: function (e) {
			var key = String.fromCharCode(e.key);
			if (this._keys.hasOwnProperty(key)) {
				this._keysDown--;

				if (key == 'A' || key == 'D') {
					this._movement.x += (-this._keys[key].dir * this._speed.x);
				} else if (key == 'W' || key == 'S') {
					this._movement.y += (-this._keys[key].dir * this._speed.y);
				}

				if (!this._keysDown)
				{
					Crafty.unbind("EnterFrame", this._doMove);
					this._movement = {x: 0, y: 0};
				}

				this.trigger('NewDirection', this._movement);
			}
		},
		/**
		 * Move the player given a direction and duration
		 * @param  {string}   direction UP/DOWN/LEFT/RIGHT
		 * @param  {integer}  duration  how long to move, in seconds
		 * @param  {function} callback  function to call on move completion
		 */
		move: function (direction, duration, callback) {
			direction = direction.toUpperCase();
			duration = duration || 1000;
			callback = callback || function(){};

			var xOrY;
			switch(direction)
			{
				case 'UP':
					this._direction = -1;
					xOrY = 'y';
					break;
				case 'DOWN':
					this._direction = 1;
					xOrY = 'y';
					break;
				case 'RIGHT':
					this._direction = 1;
					xOrY = 'x';
					break;
				case 'LEFT':
					this._direction = -1;
					xOrY = 'x';
					break;
				default:
					// do something
					return;
			}

			if (xOrY == 'x') {
				this._movement.x += (this._direction * this._speed.x);
			} else {
				this._movement.y += (this._direction * this._speed.y);
			}

			this.trigger('NewDirection', this._movement);

			Crafty.bind("EnterFrame", this._doMove);

			setTimeout(_.bind(function () {
				Crafty.unbind("EnterFrame", this._doMove);
				this._movement = {x: 0, y: 0};
				this.trigger('NewDirection', this._movement);
				callback();
			}, this), duration);
		},
		/**
		 * Function bound to the 'EnterFrame' event for moving the player
		 */
		_doMove: function () {

			if (this._movement.x !== 0) {
				this.x += this._movement.x;
				this.trigger('Moved', { x: this.x - this._movement.x, y: this.y });
			}

			if (this._movement.y !== 0) {
				this.y += this._movement.y;
				this.trigger('Moved', { x: this.x, y: this.y - this._movement.y});
			}
		}
		
	});

	/**
	 * The return value isn't all that useful here. Crafty.c keeps track of all
	 * the components we defined so we never have to use the component variable.
	 * We simply define this module as a dependency when we need to be sure that
	 * the component has been added to Crafty.
	 */
	return {
		component: component
	};
});