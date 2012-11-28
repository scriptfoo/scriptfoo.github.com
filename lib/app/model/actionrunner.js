define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		_actionCollection: null, 

		processActions: function () {
			if (this._actionCollection.length > 0) {
				var nextAction = this._actionCollection.shift();
				this.processAction(nextAction);
			}
		},
		processAction: function (action) {
			action.bind("actionDone", this.processActions);
			action.execute();
		},
		startActions: function (actions) {
			this._actionCollection = actions;
			this.processActions();
		},
		initialize: function () {
			_.bindAll(this);
		}
	});
});