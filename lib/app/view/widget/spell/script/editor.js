define([
	'backbone',
	'ace/ace',
	'app/app'
], function (Backbone, ace, App) {
	return Backbone.View.extend({
		SpellScriptModel: null,
		GameEditor: null,
		initialize: function (options) {
			_.bindAll(this);

			this.SpellScriptModel = options.SpellScriptModel;

			// Initialize ace editor
			this.GameEditor = ace.edit(this.el);
			this.GameEditor.blur(); // Do not start in the editor
			this.GameEditor.setTheme("ace/theme/monokai");
			this.GameEditor.getSession().setMode("ace/mode/javascript");
			this.GameEditor.getSession().setUseWrapMode(true);
			this.GameEditor.getSession().setWrapLimitRange(80, 100);

			// Unfortunately, the editor needs to be in App
			App.editor = this.GameEditor;

			// Update the model when the document changes
			this.GameEditor.on('change', this.onDocumentChange);
		},
		onDocumentChange: function () {
			this.SpellScriptModel.set('code', this.GameEditor.getValue());
		}
	});
});