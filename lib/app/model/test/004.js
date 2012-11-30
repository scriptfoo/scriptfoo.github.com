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

			this.get('SpeakerModel').say('It seems we\'ve mostly calmed him down, but what\'s with the exclaimation!?');
			this.get('SpeakerModel').say('In the same way we used \'toLowerCase()\', let\'s use \'replace(searchvalue, newvalue)\' to swap out the \'!\' with a \'.\'.');
			this.get('SpeakerModel').say('This time, the function requires \'parameters\', namely \'searchvalue\' and \'newvalue\'. For this spell, we\'re searching for \'!\' and the new value will be \'.\'.');
			this.get('SpeakerModel').say('Also, let\'s save the returned string into a new var named \'calmReply\'.');

			App.SpellHooksCollection.add({
				capture: ['calmReply'], // Variable names that need capturing
				callback: _.bind(this.onCast, this) 
			});

			App.editor.setValue('var lessRudeReply = "those dates will cost 190 gold!";', 1);

			this.get('SpeakerModel').say({
				text: 'You know the drill, to the spell caster:',
				sticky: true
			});
		},
		onCast: function (Spell, HookModel) {
			try {
				this.get('TesterModel').assertEquals(typeof Spell.calmReply, 'string');
				this.get('TesterModel').assertEquals('those dates will cost 190 gold.', Spell.calmReply);

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
				})

			} catch (exception) {
				this.get('SpeakerModel').say({
					text: 'That doesn\'t seem right! Set the variable \'calmReply\' to an exclaimation less version of the variable below:',
					sticky: true,
					force: true
				});
			}
		}
	});
});