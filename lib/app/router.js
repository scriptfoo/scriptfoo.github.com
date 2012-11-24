define([
	'backbone',
	'app/view/page/home'
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