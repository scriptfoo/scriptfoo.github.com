define([
	'backbone',
	'crafty'
], function (Backbone, Crafty) {
	/**
	 * We turn all Crafty entities into Backbone models so we can store other
	 * related attributes with them. We can also do nifty things like have a
	 * collection of entity models.
	 */
	return Backbone.Model.extend({
		defaults: {
			'spriteModel': null,
			'sprite': null,
			'components': '2D, Canvas',
			x: 0,
			y: 0,
			z: 0,
			'entity': null,
			'movements': null
		},
		initialize: function () {
			var spriteModel = this.get('spriteModel');
			if (spriteModel !== null) {
				new spriteModel().create();
			}

			var entity = Crafty.e(this.get('components'));

			if (this.get('sprite') !== null) {
				entity.addComponent(this.get('sprite'))
			}

			if (this.get('z') === 0) {
				// Generate z-index based on position in world
				this.set('z', entity.__coord[3] + this.get('y'));
			}

			entity.attr({
				x: this.get('x'),
				y: this.get('y'),
				z: this.get('z')
			});

			this.set('entity', entity);

			this.postInit(entity);
		},
		/**
		 * Called at the end of initialize so child entiries can run some code.
		 */
		postInit: function (entity) {},
		/**
		 * Remove the entity from the scene
		 */
		remove : function(){
			var entity = this.get('entity');

			if (entity) {
				entity.destroy();
			}
		}
	});
});