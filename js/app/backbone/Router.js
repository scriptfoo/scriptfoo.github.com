App.lib.Router = Backbone.Router.extend({
	routes: {
		"": "home"
	},
	home: function() {
		requirejs([
			'app/backbone/HomePageView'
		], function () {
			this.currentPage = new App.lib.HomePageView();
		});
	}
});