define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		defaults: {
			'entity': null,
			'params': null,
			'binding': false 
		},
		execute: function () {
			if (this.get('binding')) {

				this.get('entity').get('entity').bind("spellFail", _.bind(function(ev) {
						this.get('entity').get('entity').say(ev.message);	
					}, this));

				this.get('entity').get('entity').bind("spellSuccess", _.bind(function(ev) {
						this.get('entity').get('entity').say(ev.message);	
						this.trigger('actionDone');
					}, this));
			} else {
				this.get('entity').get('entity').unbind("spellFail");
				this.get('entity').get('entity').unbind("spellSuccess");
				this.trigger('actionDone');
			}
		}
	});
});