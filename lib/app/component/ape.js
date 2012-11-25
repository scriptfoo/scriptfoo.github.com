define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c('Ape', {
		hitbox: null,
		ape: function() {
			//setup animations
			this.requires("SpriteAnimation")
				.animate("walkUp", 0, 0, 1)
				.animate("walkDown", 2, 1, 3)
				.animate("walkLeft", 0, 1, 1)
				.animate("walkRight", 2, 0, 3)
				.animate("idle", 0, 2, 0);
			this.bind("NewDirection", function (direction) {
				if (direction.x < 0) {
					if (!this.isPlaying("walkLeft"))
						this.stop().animate("walkLeft", 20, -1);
				}
				if (direction.x > 0) {
					if (!this.isPlaying("walkRight"))
						this.stop().animate("walkRight", 20, -1);
				}
				if (direction.y < 0) {
					if (!this.isPlaying("walkUp"))
						this.stop().animate("walkUp", 20, -1);
				}
				if (direction.y > 0) {
					if (!this.isPlaying("walkDown"))
						this.stop().animate("walkDown", 20, -1);
				}
				if(!direction.x && !direction.y) {
					this.stop().animate("idle", 1, 1);
				}
			});

			this.hitbox = Crafty.e("2D, DOM, Collision")
				.attr({h: 10, w: 10, x: this._x + 5, y: this._y + 30})
				.collision();

			this.attach(this.hitbox);

			return this;
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