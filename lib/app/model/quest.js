define([
	'backbone',
	'app/model/actionrunner'
], function (Backbone, ActionRunner) {
	return Backbone.Model.extend({
		defaults: {
			'id': null,
			'name': null,
			'active': false,
			'completed': false,
			'actions': null 
		},
		startActions: function () {
			var a = new ActionRunner();
			a.startActions(this.get('actions'));
		}
	});
});