define([
	'backbone',
	'app/view/page',
	'app/module/state/model',
	'app/module/state/view',

	'app/view/widget/item/belt',
	'app/view/widget/inventory',

	'app/collection/item/slots',
	'text!template/page/home.mustache',
	'crafty',

	'app/model/item/rune',

	'app/model/spell/script',
	'app/collection/spell/scripts',
	'app/collection/spell/hooks',
	'app/view/widget/spell/script/editor',
	'app/view/widget/spell/script/caster',
	'app/view/scene/1',
	'app/view/scene/maze/1',
	'app/app'
], function (
		Backbone,
		PageView,
		StateModuleModel,
		StateModuleView,

		ItemBeltWidget,
		InventoryWidget,

		ItemSlotsCollection,
		Template,
		Crafty,

		RuneItemModel,

		SpellScriptModel,
		SpellScriptsCollection,
		SpellHooksCollection,
		SpellScriptEditorView,
		SpellScriptCasterView,
		Scene1View,
		SceneMazeView1,
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

			this._setUpInventory();
			
			// this.currentscene = new scene1view({
			// 	el: this.$('#cr-stage'),
			// 	editorspellscriptmodel: this.editorspellscriptmodel
			// });

			this.currentScene = new SceneMazeView1({
				el: this.$('#cr-stage'),
				EditorSpellScriptModel: this.EditorSpellScriptModel
			});
		},
		_setUpInventory: function () {
			// This is the gold rune that allows for the first editor
			var goldRune = new RuneItemModel({
				type: 'gold'
			});

			// The collection that holds item models in your backpack
			this.inventoryCollection = new ItemSlotsCollection([], {
				size: 40
			});

			// And the collection of runes on your 'belt' (shortcuts)
			this.runeBeltCollection = new ItemSlotsCollection([], {
				size: 5
			});

			// Puts the gold rune in your backpack
			this.inventoryCollection.addItem(goldRune, 0);
			// Puts the gold rune in position 0 of the shortcut belt
			this.runeBeltCollection.addItem(goldRune, 0);

			// Render the view in charge of the rune belt
			this.runeBeltWidget = new ItemBeltWidget({
				itemSlotsCollection: this.runeBeltCollection
			});

			// Set up the state module to toggle the inventory
			this.inventoryStateModel = new StateModuleModel();
			this.inventoryStateView = new StateModuleView({
				stateModel: this.inventoryStateModel,
				el: $('.l-toolbar-inventory')
			});

			// Render the view in charge of the inventory
			this.inventoryWidget = new InventoryWidget({
				itemSlotsCollection: this.inventoryCollection,
				stateModel: this.inventoryStateModel
			});
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		}
	});
});