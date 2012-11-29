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

			this.get('SpeakerModel').say('What if you want to use that string again later on?!')
			this.get('SpeakerModel').say('You can use a \'variable\'. For example, to set \'hatColor\' to \'blue\' you would use the following: var hatColor = "blue";')
			this.get('SpeakerModel').say({
				text: 'Try it out. Set the variable \'moniker\' to "Merlin" in the spell caster below:',
				sticky: true
			});

			this.get('SpellScriptModel').on('cast', this.onCast);
		},
		onCast: function (Model) {
			var code = Model.get('code');
			try {
				this.get('TesterModel').assertEquals(typeof moniker, 'string');
				this.get('TesterModel').assertEquals('Merlin', moniker);

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