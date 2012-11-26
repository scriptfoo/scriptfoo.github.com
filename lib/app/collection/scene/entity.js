define([
	'backbone',
	'app/model/entity'
], function (Backbone, EntityModel) {
	return Backbone.Collection.extend({
		model: EntityModel
	});
});