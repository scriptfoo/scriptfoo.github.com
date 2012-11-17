define([
	'backbone',
	'hogan',
	'App',
	'text!template/layout/default.mustache'
], function (Backbone, Hogan, App, Layout) {
	/**
	 * All page views should extend this one. It automatically handles compiling
	 * templates and placing the content in the specified layout. It also
	 * supplies a method `renderData` that allows child views to format data
	 * objects to be passed in when rendering Mustache templates.
	 */
	return Backbone.View.extend({
		'App': null, // App instance passed into initialize()
		'el': 'body', // Attaches this view to the HTML body tag

		// The path name to locate the template inside App.template
		'template.mustache': null,
		// Compiled version gets stored here
		'template': null,

		// The mustache of the layout
		'layout.mustache': Layout,
		// Compiled version gets stored here
		'layout': null,
		'initialize': function () {
			// If a layout was specified
			if (this['layout.mustache']) {
				// Compile it and store it for later use
				this.layout = Hogan.compile(this['layout.mustache']);
			}

			// Same for template
			if (this['template.mustache']) {
				this.template = Hogan.compile(this['template.mustache']);
			}

			this.render();
		},
		'render': function () {
			this.beforeRender();

			if (this.layout) {
				this.$el.html(this.layout.render(this.renderData(), {
					'body': this.template
				}));
			}

			this.afterRender();
		},
		beforeRender: function () {}, // Called at the top of render()
		afterRender: function () {},  // Called at the bottom of render()
		'renderData': function () {
			// Replace this method to provide data when rendering
			return {};
		}
	});
});