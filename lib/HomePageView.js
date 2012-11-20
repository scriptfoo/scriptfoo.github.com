define([
	'backbone',
	'PageView',
	'text!template/page/home.mustache',
	'ace/ace',
	'crafty',
	'spells/spellTests'
], function (Backbone, PageView, Template, ace, Crafty, spellTests) {
	return PageView.extend({

		events : {
			"click .l-nav-button a" : "setCurrentLevel",
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

		/**
		/* Level Stuff
		*/
		currentLevel: null,

		setCurrentLevel: function(e) {
			this.currentLevel = e.currentTarget.id;
			this.displayLevelDialog();
		},

		displayLevelDialog: function() {

			var text = '';
			switch(this.currentLevel)
			{
				case 'level01':
					text = '<p>Strings are cool. Such as "wizard hat", "wand" and "spell book".</p><p>Do note the use of double quotes around the string. This is important.</p><p>Try it for youself, enter "How do you do, fine Earth?" in the spell caster below:</p>';
					break;
				case 'level02':
					text = '<p>What if you want to use that string again later on?!</p><p>You can use a \'variable\'. For example, to set \'hatColor\' to \'blue\' you would use the following: var hatColor = "blue";</p><p>Try it out. Set the variable \'moniker\' to "Merlin" in the spell caster below:</p>';	
					break;
			}

			this.$('#game-dialog').html(text).fadeIn('slow');	
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
				alert("Pick a level from above.");
			}
		},

		/**
		 * Game related objects
		 */
		Foo: null,
		'afterRender': function () {
			var self = this;

			// Initialize ace editor
			this.gameEditor = ace.edit("game-editor");
			this.gameEditor.setTheme("ace/theme/monokai");
			this.gameEditor.getSession().setMode("ace/mode/javascript");
			this.gameEditor.getSession().setUseWrapMode(true);
			this.gameEditor.getSession().setWrapLimitRange(80, 100);

			this.gameEditor.on("focus", function () {
				self.Foo.disableControl();
			});
			this.gameEditor.on("blur", function () {
				self.Foo.enableControl();
				self.$('.l-editor-shade').show();
			});

			// TODO: not so hackish
			window.gameEditor = this.gameEditor;

			Crafty.init(950, 400);
			Crafty.canvas.init();
			Crafty.background('#6D8063');

			Crafty.c("LeftControls", {
				init: function() {
					this.requires('Multiway');
				},
				leftControls: function(speed) {
					this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
					return this;
				}
			});

			Crafty.c('Ape', {
				ape: function() {
					//setup animations
					this.requires("SpriteAnimation, Collision, Grid")
						.animate("walkUp", 0, 0, 1)
						.animate("walkDown", 2, 1, 3)
						.animate("walkLeft", 0, 1, 1)
						.animate("walkRight", 2, 0, 3)
						.animate("idle", 0, 2, 0);

					this.bind("NewDirection", function (direction) {
						if (direction.x < 0) {
							if (!this.isPlaying("walkLeft"))
								this.stop().animate("walkLeft", 20, -1);
						}
						if (direction.x > 0) {
							if (!this.isPlaying("walkRight"))
								this.stop().animate("walkRight", 20, -1);
						}
						if (direction.y < 0) {
							if (!this.isPlaying("walkUp"))
								this.stop().animate("walkUp", 20, -1);
						}
						if (direction.y > 0) {
							if (!this.isPlaying("walkDown"))
								this.stop().animate("walkDown", 20, -1);
						}
						if(!direction.x && !direction.y) {
							this.stop().animate("idle", 1, 1);
						}
					});

					return this;
				}
			});

			Crafty.sprite(141, 45, "images/sprites/GrassAreaSmall.png", {GrassAreaSmall: [0, 0]});
			Crafty.sprite(222, 57, "images/sprites/GrassAreaLarge.png", {GrassAreaLarge: [0, 0]});
			Crafty.sprite(93, 42, "images/sprites/GrassAreaTall.png", {GrassAreaTall: [0, 0]});

			Crafty.sprite(27, 39, "images/sprites/FooSheet.png", {
				FooIdle: [0, 2]
			}, 1);

			this.Foo = Crafty.e("2D, Canvas, FooIdle, LeftControls, Ape")
				.attr({z: 10})
				.leftControls(2)
				.ape();

			if (this.gameEditor.isFocused())
			{
				this.Foo.disableControl();
			}

			for (var i = 0; i < 20; i++) {
				Crafty.e("2D, Canvas, GrassAreaSmall").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
				Crafty.e("2D, Canvas, GrassAreaLarge").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
				Crafty.e("2D, Canvas, GrassAreaTall").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
			}
		},
		shadeClicked: function () {
			this.gameEditor.focus();
			this.$('.l-editor-shade').hide();
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		}
	});
});