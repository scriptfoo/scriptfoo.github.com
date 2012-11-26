define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c('Rigidbody', {
		hitbox: null,
		rigidbody: function(offsetX, offsetY, hitboxH, hitboxW) {

			// Create a hitbox
			this.hitbox = Crafty.e("2D, DOM, Collision, RigidbodyHitbox, WiredHitBox")
				.attr({
					h: hitboxH || 10,
					w: hitboxW || this._w,
					x: this._x + (offsetX || 0),
					y: this._y + (offsetY || 30)
				})
				.collision();

			this.attach(this.hitbox);

			this.bind('Moved', this.onMove);

			return this;
		},
		onMove: function (from) {
			if(this.hitbox.hit('SolidArea')) {
				this.attr({x: from.x, y:from.y});
				return;
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