define([
	'app/model/action'
], function (ActionModel) {
	return ActionModel.extend({
		execute: function () {
			this.get('entity').get('entity').startMoving(this.get('params'));

			this.get('entity').get('entity').bind("Stopped", _.once(_.bind(function() {
					this.trigger('actionDone');
				}, this)));
		}
	});
});