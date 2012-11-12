// Start the main app logic.
requirejs([
	// All the lib/* dependencies
	'lib/backbone', // This dependency loads jquery and underscore for us
	'lib/crafty'
],
function () {
	// Global App object where we can store instances
	App = {
		// Main Router object (only ever need onein this app)
		Router: null,
		// We put our classes in here
		lib: {},
		template: {}
	};

	$(function () {
		// As soon as DOM is ready, we look for our templates and store them
		$('script.template').each(function () {
			var $script = $(this);
			App.template[$script.data('path')] = $script.html();
		});
	});

	requirejs([
		'app/backbone/Router'
	],
	function () {
		// Create the router instance
		App.Router = new App.lib.Router();
		// Start the application
		Backbone.history.start({
			pushState: true,
			// This ensures we can run this file locally without a webserver
			root: window.location.host + window.location.pathname
		});
	});
});