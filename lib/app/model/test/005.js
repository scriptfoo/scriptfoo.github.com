define([
	'app/model/test',
	'app/collection/spell/hooks',
	'app/app'
], function (TestModel, SpellHooksCollection, App) {
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
			this.get('SpeakerModel').say('function functionName(parameterName) {<br/>// magic here<br/>return result;<br/>}');
			this.get('SpeakerModel').say('The \'result\' above can be many things (number, string, etc.), but here we\'re assuming it\'s a variable that was set during the magic.');

			App.SpellHooksCollection.add({
				capture: ['haggle'], // Variable names that need capturing
				callback: _.bind(this.onCast, this) 
			});

			this.get('SpeakerModel').say({
				text: 'Complete the function below that takes the cost of any goods, and subtracts 5 from it.',
				sticky: true
			});

			var editorValue = 'function haggle(askingPrice)\n{\n\tvar newPrice = ???;\n\treturn newPrice; // we could also return 8, \'hello\', but that wouldn\'t help.\n}';
			App.editor.setValue(editorValue, 1);
		},
		onCast: function (Spell, HookModel) {
			var code = this.get('SpellScriptModel').get('code');
			try {
				
				// Check to see if they implemented it 
				var checkImplemented = code.indexOf('???');
				if (checkImplemented !== -1)
				{
					throw {type:"SpellTest", message:"This spell was not implemented."}
				}

				this.get('TesterModel').assertEquals(typeof Spell.haggle, 'function');

				var res = Spell.haggle(150);
				this.get('TesterModel').assertEquals(res, 145);

				this.get('SpeakerModel').say({
					text: 'Good work! On to the next quest!',
					force: true
				})

				// Remove the hook from the collection
				App.SpellHooksCollection.remove(HookModel);
				// Let everyone know we're done
				this.trigger('done');
				this.trigger('done:success'); // We could have a done:failure in the future
			} catch (exception) {
				this.get('SpeakerModel').say({
					text: 'That doesn\'t seem right! Complete the function below that takes the cost of any goods, and subtracts 5 from it.',
					sticky: true,
					force: true
				});
			}
		}
	});
});