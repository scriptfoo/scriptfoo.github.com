define([
	'backbone',
	'app/model/quest'
], function (Backbone, QuestModel) {
	return Backbone.Collection.extend({
		model: QuestModel
	});
});