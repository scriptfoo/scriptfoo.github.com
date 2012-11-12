define([
	'backbone',
	'HomePageView',
	'App'
], function (Backbone, HomePageView) {
	return Backbone.Router.extend({
		App: null,
		routes: {
			"": "home"
		},
		initialize: function (options) {
			this.App = options.App;
		},
		home: function () {
			this.currentPage = new HomePageView({App: this.App});
		}
	})
});