define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c('DynamicZ', {
		init: function(offsetX, offsetY, hitboxH, hitboxW) {

			this.bind('Moved', function (from) {
				this.attr({
					z: this.__coord[3] + this.y
				});
			});

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