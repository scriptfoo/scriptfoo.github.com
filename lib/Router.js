define([
	'backbone',
	'HomePageView'
], function (Backbone, HomePageView) {
	return Backbone.Router.extend({
		routes: {
			"": "home"
		},
		home: function () {
			this.currentPage = new HomePageView();
		}
	})
});