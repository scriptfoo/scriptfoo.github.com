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
			'entity': null
		},
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