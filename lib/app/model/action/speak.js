define([
	'app/model/action'
], function (ActionModel) {
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
						this.trigger('actionDone');
					}, this));
			} else {
				p.forEach(function(el){
					e.get('entity').say(el);
				});
				this.trigger('actionDone');
			}
		}
	});
});