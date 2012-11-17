define([
	'backbone',
	'PageView',
	'text!template/page/home.mustache'
], function (Backbone, PageView, Template) {
	return PageView.extend({
		// Specify the templatePath and let the PageView do the rest
		'template.mustache': Template,
		'renderData': function () {
			return {
				'pageTitle': 'Home',
				'message': 'This is my message'
			};
		}
	});
});