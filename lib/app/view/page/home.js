define([
	'backbone',
	'app/view/page',
	'text!template/page/home.mustache',
	'ace/ace',
	'crafty',
	'app/spells/spellTests',
	'app/view/scene/1'
], function (Backbone, PageView, Template, ace, Crafty, spellTests, Scene1View) {
	return PageView.extend({
		events : {
			"click button[name=cast-spell]": "castSpell",
			'click .l-editor-shade': 'shadeClicked'
		},
		
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
		'afterRender': function () {
			// Initialize ace editor
			this.gameEditor = ace.edit("game-editor");
			this.gameEditor.blur(); // Do not start in the editor
			this.gameEditor.setTheme("ace/theme/monokai");
			this.gameEditor.getSession().setMode("ace/mode/javascript");
			this.gameEditor.getSession().setUseWrapMode(true);
			this.gameEditor.getSession().setWrapLimitRange(80, 100);

			this.gameEditor.on("focus", this.gameEditorFocus);
			this.gameEditor.on("blur", this.gameEditorBlur);

			Crafty.init(950, 400);
			Crafty.canvas.init();

			this.currentScene = new Scene1View({
				el: this.$('#cr-stage')
			});
		},
		gameEditorFocus: function () {
			this.currentScene.disablePlayerControl();
		},
		gameEditorBlur: function () {
			this.currentScene.enablePlayerControl();
			this.$('.l-editor-shade').show();
		},
		shadeClicked: function () {
			this.gameEditor.focus();
			this.$('.l-editor-shade').hide();
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		},
		castSpell: function() {
			if (this.currentLevel != null)
			{
				var res = spellTests.hocusPocus(this.currentLevel, this.gameEditor);

				if (res === true)
				{
					this.$('#game-dialog').fadeOut('slow').html("");
					this.gameEditor.getSession().setValue("");
				}
			}
			else
			{
				this.$el.append(this.caster.render(this.casterData()));
			}
		},
		casterData: function () {
			var exposed = [];

			for(var i in this.App.exposed) {
				if (this.App.exposed.hasOwnProperty(i)) {
					exposed.push({'key': i});
				}
			}

			return {
				exposed: exposed,
				spell: this.gameEditor.getSession().getValue()
			};
		}
	});
});