define([
	'backbone',
	'PageView',
	'text!template/page/home.mustache',
	'ace/ace'
], function (Backbone, PageView, Template, ace) {
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
		},
		'renderData': function () {
			return {
				'pageTitle': 'Home'
			};
		}
	});
});