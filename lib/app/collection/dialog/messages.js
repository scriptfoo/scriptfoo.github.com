define([
	'backbone',
	'app/model/dialog/message'
], function (Backbone, DialogMessageModel) {
	return Backbone.Collection.extend({
		model: DialogMessageModel
	});
});