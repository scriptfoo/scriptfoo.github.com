define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		defaults: {
			TestModel: null
		},
		initialize: function () {
			_.bindAll(this);
		},
		execute: function () {
			var Test = this.get('TestModel');
			Test.on('done', this.onDone);
			Test.execute();
		},
		onDone: function (Model) {
			this.trigger('actionDone');
		}
	});
});