define([
	'app/model/test'
], function (TestModel) {
	return TestModel.extend({
		defaults: {
			SpeakerModel: null,
			SpellScriptModel: null,
			TesterModel: null
		},
		initialize: function () {
			_.bindAll(this);
		},
		execute: function () {
			var data = this.toJSON();

			this.get('SpeakerModel').say('These function things are pretty cool, eh? Imagine if we could make our own?!');
			this.get('SpeakerModel').say('Guess what...? We can. Let\'s stick with the date salesman...');
			this.get('SpeakerModel').say('You have a lot of stuff to buy, and you\'re tired of haggling. Let\'s write a function to help, but first, the basics:');
			this.get('SpeakerModel').say('function functionName(parameterName)
				{
					// magic here
					return result;	
				}');
			this.get('SpeakerModel').say('The \'result\' above can be many things (number, string, etc.), but here we\'re assuming it\'s a variable that was set during the magic.');
			this.get('SpeakerModel').say({
				text: 'Complete the function below that takes the cost of any goods, and subtracts 5 from it.',
				sticky: true
			});

			/*
			function haggle(askingPrice)
			{
				var newPrice = ???;
				return newPrice; // we could also return 8, 'hello', but that wouldn't help.
			}
			*/

			this.get('SpellScriptModel').on('cast', this.onCast);
		},
		onCast: function (Model) {
			var code = Model.get('code');
			try {

				var checkImplemented = code.indexOf('???');

				if (checkImplemented !== -1)
				{
					throw {type:"SpellTest", "This spell was not implemented."}
				}

				this.get('TesterModel').assertEquals(typeof haggle, 'function');

				var res = haggle(150);
				this.get('TesterModel').assertEquals(res, 145);

				this.get('SpeakerModel').say({
					text: 'Good work! On to the next quest!',
					force: true
				})

				// Stop listening for spells
				this.get('SpellScriptModel').off('cast', this.onCast);
				// Let everyone know we're done
				this.trigger('done');
				this.trigger('done:success'); // We could have a done:failure in the future
			} catch (exception) {
				this.get('SpeakerModel').say({
					text: 'That doesn\'t seem right! Set the variable \'moniker\' to "Merlin" in the spell caster below:',
					sticky: true,
					force: true
				});
			}
		}
	});
});