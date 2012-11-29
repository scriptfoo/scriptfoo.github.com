define([
	'backbone',
	'text!template/widget/caster.mustache',
	'app/app'
], function (Backbone, CasterTemplate, App) {
	return Backbone.View.extend({
		events: {
			'click button.cast': 'castClicked'
		},
		// The mustache for the caster
		'caster.mustache': CasterTemplate,
		// Compiled version of caster
		'caster': null,
		SpellScriptModel: null,
		initialize: function (options) {
			_.bindAll(this);

			this.caster = Hogan.compile(this['caster.mustache']);
			this.SpellScriptModel = options.SpellScriptModel;
		},
		castClicked: function () {
			this.$el.append(this.caster.render(this.casterData()));
			this.SpellScriptModel.triggerCastEvent();
		},
		casterData: function () {
			var exposed = [];
			var capture = [];

			for(var i in App.exposed) {
				if (App.exposed.hasOwnProperty(i)) {
					exposed.push({'key': i});
				}
			}

			App.SpellHooksCollection.each(function (ScriptHookModel) {
				var toCapture = ScriptHookModel.getVariablesToCapture();

				for (var i = 0; i < toCapture.length; i++) {
					capture.push({'variable': toCapture[i]});
				}
			});

			return {
				exposed: exposed,
				capture: capture,
				spell: this.SpellScriptModel.get('code')
			};
		}
	});
});