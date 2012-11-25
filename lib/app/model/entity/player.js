define([
	'app/model/entity',
	'app/model/sprite/foo',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/ape',
	'app/component/playercontrols'
], function (EntityModel, FooSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'health': 100.0,
			'level': 1,
			'spriteModel': FooSpriteModel,
			'sprite': 'Foo',
			'components': '2D, Canvas, PlayerControls, Ape',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		postInit: function (entity) {
			entity.playerControls(2)
				.ape();
		},
		takeDamage: function (amount) {
			this.set('health', this.get('health') - amount);
		}
	});
});