define([
	'app/model/entity',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/ape',
	'app/component/playercontrols'
], function (EntityModel) {
	return EntityModel.extend({
		defaults: {
			name: 'Foo',
			health: 100.0,
			level: 1,
			entity: null
		},
		initialize: function (options) {
			// @TODO: some of these things should be dynamic from options
			var entity = Crafty.e("2D, Canvas, Foo, PlayerControls, Ape")
				.attr({z: 10})
				.playerControls(2)
				.ape();

			this.set('entity', entity);
		},
		takeDamage: function (amount) {
			this.set('health', this.get('health') - amount);
		}
	});
});