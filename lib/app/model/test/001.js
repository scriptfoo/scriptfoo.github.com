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

			this.get('SpeakerModel').say('Let\'s talk about Strings. They are pretty great, for example: "wizard hat", "wand" and "spell book".')
			this.get('SpeakerModel').say('Do note the use of double quotes around the string. This is important.')
			this.get('SpeakerModel').say({
				text: 'Try it for youself, enter "How do you do, fine Earth?" in the spell caster below:',
				sticky: true
			});

			this.get('SpellScriptModel').on('cast', this.onCast);
		},
		onCast: function (Model) {
			var code = Model.get('code');
			try {
				this.get('TesterModel').assertEquals(typeof code, 'string');
				this.get('TesterModel').assertEquals('"How do you do, fine Earth?"', code);

				this.get('SpeakerModel').say({
					text: 'Good work! On to the next quest!',
					force: true,
					callback: _.bind(function() {
									// Stop listening for spells
									this.get('SpellScriptModel').off('cast', this.onCast);
									// Let everyone know we're done
									this.trigger('done');
									this.trigger('done:success'); // We could have a done:failure in the future
								}, this)
				});

			} catch (exception) {
				this.get('SpeakerModel').say({
					text: 'That doesn\'t seem right! Enter "How do you do, fine Earth?" in the spell caster below:',
					sticky: true,
					force: true
				});
			}
		}
	});
});