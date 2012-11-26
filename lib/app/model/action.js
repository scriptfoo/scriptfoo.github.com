define([
	'backbone',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/action'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			'method': null,
			'params': null,
			'entity': null
		}
	});
});