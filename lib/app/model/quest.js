define([
	'backbone',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/action'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			'index': null,
			'name': null,
			'active': false,
			'completed': false,
			'text': [],
			'actions': null, 
			'entity': null
		},
		initialize: function () {
			var entity = Crafty.e('Action');

			this.set('entity', entity);
		}
	});
});