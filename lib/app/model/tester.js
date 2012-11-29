define([
	'backbone'
], function (Backbone) {
	return Backbone.Model.extend({
		_failAssertion: function (test, _arguments) {
			var details = {
				type: 'tester',
				test: test,
				arguments: _arguments
			};

			// File a generic `failure` and a `failure:assertEquals` type event
			this.trigger('failure', details);
			this.trigger('failure:'+test, details);

			// Also throw the exception (maybe not needed later?)
			throw exception;
		},
		// Assertions
		assertFail: function() {
			this._failAssertion('assertFail');
		},
		assertEquals: function(lhs, rhs) {
			if (lhs != rhs) {
				this._failAssertion('assertEquals', arguments);
			}
		},
		assertNotEquals: function(lhs, rhs) {
			if (lhs == rhs) {
				this._failAssertion('assertNotEquals', arguments);
			}
		},
		assertTrue: function(value) {
			if (!value) {
				this._failAssertion('assertTrue', arguments);
			}
		},
		assertFalse: function(value) {
			if (value) {
				this._failAssertion('assertFalse', arguments);
			}
		}
	});
});
