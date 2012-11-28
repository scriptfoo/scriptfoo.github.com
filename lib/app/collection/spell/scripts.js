define([
	'backbone',
	'app/model/spell/script'
], function (Backbone, SpellScriptModel) {
	return Backbone.Collection.extend({
		model: SpellScriptModel
	});
});