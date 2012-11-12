/**
 * All page views should extend this one. It automatically handles compiling
 * templates and placing the content in the specified layout. It also
 * supplies a method `renderData` that allows child views to format data
 * objects to be passed in when rendering Mustache templates.
 */
App.lib.PageView = Backbone.View.extend({
	'el': 'body',
	// The path name to locate the template inside App.template
	'templatePath': null,
	// Compiled version gets stored here
	'template': null,
	// The path name to locate the template inside App.template
	'layoutPath': 'layout/default',
	// Compiled version gets stored here
	'layout': null,
	'initialize': function () {
		// If a layoutPath was specified
		if (this.layoutPath) {
			// Compile it and store it for later use
			this.layout = Hogan.compile(App.template[this.layoutPath]);
		}
		// Same for templatePath
		if (this.templatePath) {
			this.template = Hogan.compile(App.template[this.templatePath]);
		}

		this.render();
	},
	'render': function () {
		if (this.layout) {
			this.$el.html(this.layout.render(this.renderData(), {
				'body': this.template
			}));
		}
	},
	'renderData': function () {
		// Replace this method to provide data when rendering
		return {};
	}
});