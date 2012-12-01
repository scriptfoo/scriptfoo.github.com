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
			this.get('SpeakerModel').say('Note that the function will \'return\' a new, calmer, string, but it isn\'t saving it anywhere. You will need to assign it to a variable like we did previously.');

			App.SpellHooksCollection.add({
				capture: ['lessRudeReply'], // Variable names that need capturing
				callback: _.bind(this.onCast, this) 
			});

			this.get('SpeakerModel').say({
				text: 'Given the variable below, assign the lower case version of rudeReply to a variable called "lessRudeReply":',
				sticky: true
			});
		},
		onCast: function (Spell, HookModel) {
			try {
				this.get('TesterModel').assertEquals(typeof Spell.lessRudeReply, 'string');
				this.get('TesterModel').assertEquals('those dates will cost 190 gold!', Spell.lessRudeReply);

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
					text: 'That doesn\'t seem right! Given the variable below, assign the lower case version of rudeReply to a variable called "lessRudeReply":',
					sticky: true,
					force: true
				});
			}
		}
	});
});
