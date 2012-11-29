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

			this.get('SpeakerModel').say('It seems we\'ve mostly calmed him down, but what\'s with the exclaimation!?');
			this.get('SpeakerModel').say('In the same way we used \'toLowerCase()\', let\'s use \'replace(searchvalue, newvalue)\' to swap out the \'!\' with a \'.\'.');
			this.get('SpeakerModel').say('Also, let\'s save the returned string into a new var named \'calmReply\'.');
			this.get('SpeakerModel').say('');
			this.get('SpeakerModel').say('');
			this.get('SpeakerModel').say('');
			this.get('SpeakerModel').say('');
			this.get('SpeakerModel').say({
				text: 'You know the drill, to the spell caster:',
				sticky: true
			});

			//var lessRudeReply = "those dates will cost 190 gold!";

			this.get('SpellScriptModel').on('cast', this.onCast);
		},
		onCast: function (Model) {
			var code = Model.get('code');
			try {
				this.get('TesterModel').assertEquals(typeof calmReply, 'string');
				this.get('TesterModel').assertEquals('those dates will cost 190 gold.', calmReply);

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
					text: 'That doesn\'t seem right! Set the variable \'calmReply\' to an exclaimation less version of the variable below:',
					sticky: true,
					force: true
				});
			}
		}
	});
});