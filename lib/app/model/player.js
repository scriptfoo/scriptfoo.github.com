define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			name: 'Foo',
			health: 100.0,
			level: 1
		},
		takeDamage: function (amount) {
			this.set('health', this.get('health') - amount);
		}
	});
});