define([
	'backbone',
	'PageView',
	'text!template/page/home.mustache',
	'ace/ace',
	'crafty'
], function (Backbone, PageView, Template, ace, Crafty) {
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
		'afterRender': function () {
			// Initialize ace editor
			this.gameEditor = ace.edit("game-editor");
			this.gameEditor.setTheme("ace/theme/monokai");
			this.gameEditor.getSession().setMode("ace/mode/javascript");

			Crafty.init(960, 400);
			Crafty.background('#6D8063');

			Crafty.sprite(141, 45, "images/sprites/GrassAreaSmall.png", {GrassAreaSmall: [0, 0]});
			Crafty.sprite(222, 57, "images/sprites/GrassAreaLarge.png", {GrassAreaLarge: [0, 0]});
			Crafty.sprite(93, 42, "images/sprites/GrassAreaTall.png", {GrassAreaTall: [0, 0]});

			for (var i = 0; i < 20; i++) {
				Crafty.e("2D, DOM, GrassAreaSmall").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
				Crafty.e("2D, DOM, GrassAreaLarge").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
				Crafty.e("2D, DOM, GrassAreaTall").attr({
					x: Crafty.math.randomInt(0, 860),
					y: Crafty.math.randomInt(0, 300)
				});
			}
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		}
	});
});