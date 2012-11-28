define([
	'app/model/action'
], function (ActionModel) {
	return ActionModel.extend({
		execute: function () {
			var callback = _.bind(function() {
					this.trigger('actionDone');
				}, this);	

			setTimeout(callback, this.get('params'));		
		}
	});
});