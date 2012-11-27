define([
	'backbone',
	'app/model/action/message'
], function (Backbone, ActionMessageModel) {
	return Backbone.Collection.extend({
		model: ActionMessageModel
	});
});