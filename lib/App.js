define(['Router'], function (Router) {
	return {
		template: {},
		initialize: function() {
			this.Router = new Router({App: this});
			// Start the application
			Backbone.history.start({
				pushState: true,
				// This ensures we can run this file locally without a webserver
				root: window.location.host + window.location.pathname
			});
		}
	};
});