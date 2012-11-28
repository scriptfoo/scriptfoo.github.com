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
		dumbEntity: null,
		componentsHash: null, // Hash of components for quick searching
		defaults: {
			'spriteModel': null,
			'sprite': null,
			'components': null,
			x: 0,
			y: 0,
			z: 0,
			'entity': null
		},
		initialize: function () {
			var spriteModel = this.get('spriteModel');
			var sprite = this.get('sprite');
			var components = _.union([], this.get('components'));
			var entity;

			if (components === null) {
				// Default to ['2D', 'Canvas']
				components = ['2D', 'Canvas'];
			}

			if (spriteModel !== null) {
				new spriteModel().create();
			}

			if (sprite !== null) {
				components.unshift(sprite);
			}

			// Stores the components with the name as both key and value
			this.componentsHash = _.object(components, components);

			if (_.has(this.componentsHash, '2D') && _.has(this.componentsHash, 'Canvas')) {
				// These components need to be in front of the sprite
				components = _.union(['2D', 'Canvas'], components);
			}

			// Save components back to model
			this.set('components', components);

			// Add all the components
			entity = Crafty.e(components.join(', '));

			entity.Model = this; // Store the model in the entity

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
		},
		say: function () {
			// Enough entities have this component so I'm making a quick alias
			this.get('entity').say.apply(this.get('entity'), arguments);
		}
	});
});