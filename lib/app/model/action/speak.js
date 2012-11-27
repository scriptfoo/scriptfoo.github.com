define([
	'crafty',
	'app/model/action'
], function (Crafty, ActionModel) {
	return ActionModel.extend({
		defaults: {
			'entity': null,
			'params': null,
			'wait': false 
		},
		execute: function () {
			var e = this.get('entity');
			var p = this.get('params');

			if (this.get('wait')) {
				e.get('entity').say(p, _.bind(function() {
						Crafty.trigger('actionStopping');	
					}, this));

				Crafty.trigger('actionStarting');
			} else {
				p.forEach(function(el){
					e.get('entity').say(el);
				});
			}
		}
	});
});