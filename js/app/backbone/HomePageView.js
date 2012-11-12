App.lib.HomePageView = App.lib.PageView.extend({
	// Specify the templatePath and let the PageView do the rest
	'templatePath': 'page/home',
	'renderData': function () {
		return {
			'pageTitle': 'Home',
			'message': 'This is my message'
		};
	}
});