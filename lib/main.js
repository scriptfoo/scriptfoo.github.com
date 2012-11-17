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
	App.Router = new Router();
	// Start the application
	Backbone.history.start({
		pushState: true,
		// This ensures we can run this file locally without a webserver
		root: window.location.host + window.location.pathname
	});
});