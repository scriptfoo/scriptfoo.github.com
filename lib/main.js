requirejs([
	'jquery',
	'underscore',
	'backbone',
	'hogan',
	'crafty',
	'App',
	'Router'
],
function ($, _, Backbone, Hogan, Crafty, App, Router) {
	// As soon as DOM is ready, we look for our templates and store them
	$('script.template').each(function () {
		var $script = $(this);
		App.template[$script.data('path')] = $script.html();
	});

	App.Router = new Router();
	// Start the application
	Backbone.history.start({
		pushState: true,
		// This ensures we can run this file locally without a webserver
		root: window.location.host + window.location.pathname
	});
});