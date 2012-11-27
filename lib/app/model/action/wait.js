define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		execute: function () {
			var callback = _.bind(function() {
					Crafty.trigger('actionStopping');
				}, this);	

			setTimeout(callback, this.get('params'));		

			Crafty.trigger('actionStarting');
		}
	});
});