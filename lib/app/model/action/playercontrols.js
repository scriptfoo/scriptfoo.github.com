define([
	'app/model/action'
], function (ActionModel) {
	return ActionModel.extend({
		defaults: {
			'entity': null,
			'params': null,
			'controlsState': false 
		},
		execute: function () {
			if (this.get('controlsState')) {
				this.get('entity').get('entity').enableControls();
			} else {
				this.get('entity').get('entity').disableControls();
			}
			this.trigger('actionDone');
		}
	});
});