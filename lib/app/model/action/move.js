define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		execute: function () {
			this.get('entity').get('entity').startMoving(this.get('params'));

			this.get('entity').get('entity').bind("Stopped", _.bind(function() {
					Crafty.trigger('actionStopping');
				}, this));

			Crafty.trigger('actionStarting');
		}
	});
});