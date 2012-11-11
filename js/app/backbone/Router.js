App.lib.Router = Backbone.Router.extend({
	routes: {
		"": "home"
	},
	home: function() {
		console.log("I'm home!");
	}
});