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

			this.get('SpeakerModel').say('What if you want to use that string again later on?!')
			this.get('SpeakerModel').say('You can use a \'variable\'. For example, to set \'hatColor\' to \'blue\' you would use the following: var hatColor = "blue";')

			App.SpellHooksCollection.add({
				capture: ['moniker'], // Variable names that need capturing
				callback: _.bind(this.onCast, this) 
			});

			this.get('SpeakerModel').say({
				text: 'Try it out. Set the variable \'moniker\' to "Merlin" in the spell caster below:',
				sticky: true
			});
		},
		onCast: function (Spell, HookModel) {
			try {
				this.get('TesterModel').assertEquals(typeof Spell.moniker, 'string');
				this.get('TesterModel').assertEquals('Merlin', Spell.moniker);

				this.get('SpeakerModel').say({
					text: 'Good work! On to the next quest!',
					force: true,
					callback: _.bind(function() {
									// Remove the hook from the collection
									App.SpellHooksCollection.remove(HookModel);
									// Let everyone know we're done
									this.trigger('done');
									this.trigger('done:success'); // We could have a done:failure in the future
								}, this)
				});

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