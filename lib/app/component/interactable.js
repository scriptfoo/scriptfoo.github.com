define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c('Interactable', {
		hitbox: null,
		init: function () {
			// Create a hitbox
			this.hitbox = Crafty.e("2D, DOM, InteractableArea")
				.attr({
					h: this._h,
					w: this._w,
					x: this._x,
					y: this._y
				});

			this.attach(this.hitbox);
		},
		interactable: function(offsetX, offsetY, hitboxH, hitboxW) {

			// Update the hitbox
			this.hitbox.attr({
				h: hitboxH || this._h,
				w: hitboxW || this._w,
				x: this._x + (offsetX || 0),
				y: this._y + (offsetY || 0)
			});

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