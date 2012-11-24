define([
	'app/model/entity',
	'app/model/sprite/weeds'
], function (EntityModel, WeedsSpriteModel) {
	return EntityModel.extend({
		defaults: {
			type: 'WeedDark', // Default to this type of weed
			x: 0,
			y: 0,
			z: 0,
			entity: null
		},
		initialize: function () {
			new WeedsSpriteModel().create();

			var entity = Crafty.e("2D, Canvas")
				.addComponent(this.get('type'))
				.attr({
					x: this.get('x'),
					y: this.get('y'),
					z: this.get('z')
				});

			this.set('entity', entity);
		},
		takeDamage: function (amount) {
			this.set('health', this.get('health') - amount);
		}
	});
});