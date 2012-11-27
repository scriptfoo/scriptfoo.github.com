define([
	'app/model/action'
], function (ActionModel) {
	return ActionModel.extend({
		defaults: {
			'entity': null,
			'params': null,
			'castState': false 
		},
		execute: function () {
			if (this.get('castState')) {
				$('button[name=cast-spell]').removeAttr("disabled");
			} else {
				$('button[name=cast-spell]').attr("disabled", "disabled");
			}
		}
	});
});