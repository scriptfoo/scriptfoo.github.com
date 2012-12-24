define([
	'backbone',
	'app/view/page',
	'text!template/page/home.mustache',
	'crafty',
	'app/model/spell/script',
	'app/collection/spell/scripts',
	'app/collection/spell/hooks',
	'app/view/widget/spell/script/editor',
	'app/view/widget/spell/script/caster',
	'app/view/scene/1',
	'app/app'
], function (
		Backbone,
		PageView,
		Template,
		Crafty,
		SpellScriptModel,
		SpellScriptsCollection,
		SpellHooksCollection,
		SpellScriptEditorView,
		SpellScriptCasterView,
		Scene1View,
		App
	) {
	return PageView.extend({
		// Specify the templatePath and let the PageView do the rest
		'template.mustache': Template,
		/**
		 * After this view has been rendered, gameEditor will contain the ace
		 * editor object. We will probably need it in order to get user input
		 * as well as inserting code snippets.
		 *
		 * @type {object}
		 */
		gameEditor: null,
		currentScene: null,

		$fps: null, // The .fps div

		SpellScriptEditorView: null,
		// The SpellScriptModel specifically for the editor view
		EditorSpellScriptModel: null,
		// The SpellScriptsCollection specifically for spells that have been cast
		CastSpellScriptsCollection: null,
		afterRender: function () {
			Crafty.init(950, 400);
			Crafty.canvas.init();

			this.$fps = this.$('.fps');

			Crafty.bind('MessureFPS', _.bind(function(fps) {
				this.$fps.text(fps.value);
			}, this));

			// Hooks added to this collection run in the scope of the spell
			App.SpellHooksCollection = new SpellHooksCollection();

			this.CastSpellScriptsCollection = new SpellScriptsCollection();
			this.EditorSpellScriptModel = new SpellScriptModel();
			this.SpellScriptEditorView = new SpellScriptEditorView({
				el: this.$('.spell-editor'),
				SpellScriptModel: this.EditorSpellScriptModel
			});
			this.SpellScriptCasterView = new SpellScriptCasterView({
				el: this.$('.l-game-toolbar'),
				SpellScriptModel: this.EditorSpellScriptModel
			});

			this.currentScene = new Scene1View({
				el: this.$('#cr-stage'),
				EditorSpellScriptModel: this.EditorSpellScriptModel
			});
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		}
	});
});