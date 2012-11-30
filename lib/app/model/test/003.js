define([
	'app/model/test',
	'app/app'
], function (TestModel, App) {
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

			this.get('SpeakerModel').say('Continuing on the topic of strings, this universe provides you with all sorts of ways to manipulate them.');
			this.get('SpeakerModel').say('For example, you\'ve asked a peddler how much gold a fistfull of dates would cost. He replies');
			this.get('SpeakerModel').say('"THOSE DATES WILL COST 190 GOLD!"');
			App.editor.setValue('var rudeReply = "THOSE DATES WILL COST 190 GOLD!";', 1);
			this.get('SpeakerModel').say('Well, there\'s no reason to shout. With a function called \'toLowerCase()\' we can calm him down.');
			this.get('SpeakerModel').say('This function can be called by \'chaining\' it onto the variable itself: variableName.toLowerCase();');
			this.get('SpeakerModel').say('Note: The function will \'return\' a new, calmer, string, but it isn\'t saving it into the given var.');
			this.get('SpeakerModel').say({
				text: 'Given the variable below, try it in the spell caster:',
				sticky: true
			});

			this.get('SpellScriptModel').on('cast', this.onCast);
		},
		onCast: function (Model) {
			var code = Model.get('code');
			try {
				var res = eval(code);

				this.get('TesterModel').assertEquals(typeof res, 'string');
				this.get('TesterModel').assertEquals('those dates will cost 190 gold!', res);

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
				})

			} catch (exception) {
				this.get('SpeakerModel').say({
					text: 'That doesn\'t seem right! Given the variable below, try it in the spell caster:',
					sticky: true,
					force: true
				});
			}
		}
	});
});