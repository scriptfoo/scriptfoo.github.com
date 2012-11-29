define([
	'backbone',
	'app/model/spell/hook'
], function (Backbone, SpellHookModel) {
	return Backbone.Collection.extend({
		model: SpellHookModel
	});
});