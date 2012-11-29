define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		defaults: {
			LevelModel: null
		},
		initialize: function () {
			_.bindAll(this);
		},
		execute: function () {
			var Level = this.get('LevelModel');
			Level.on('done', this.onDone);
			Level.execute();
		},
		onDone: function (Model) {
			this.trigger('actionDone');
		}
	});
});