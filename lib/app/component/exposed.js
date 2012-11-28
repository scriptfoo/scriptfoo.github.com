define([
	'crafty',
	'app/app'
], function (Crafty, App) {
	var component = Crafty.c('Exposed', {
		init: function() {
			App.exposed[this.Model.getName()] = this.Model;

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