define([
	'backbone',
	'app/model/action'
], function (Backbone, ActionModel) {
	return Backbone.Collection.extend({
		model: ActionModel
	});
});