define([
	'crafty',

	'app/component/interactable'
], function (Crafty) {
	var component = Crafty.c('Solid', {
		hitbox: null,
		init: function () {
			this.requires('Interactable');

			// Create a hitbox
			this.hitbox.addComponent('SolidArea');
		},
		solid: function () {
			// Alias for interactable now
			return this.interactable.apply(this, arguments);
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