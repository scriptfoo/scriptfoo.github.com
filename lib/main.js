requirejs([
	'jquery',
	'underscore',
	'backbone',
	'hogan',
	'crafty',
	'App'
],
function ($, _, Backbone, Hogan, Crafty, App) {
	// As soon as DOM is ready, we look for our templates and store them
	$('script.template').each(function () {
		var $script = $(this);
		App.template[$script.data('path')] = $script.html();
	});
	App.initialize();
});