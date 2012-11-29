define(['crafty', 'app/spells/spellTester'],function(Crafty, spellTester) {
		return {
			level02: function(exp)
			{
				delete window.moniker; 

				$('head').append('<script>'+exp+'</script>');

				spellTester.assertEquals(typeof moniker, 'string');
				spellTester.assertEquals('Merlin', moniker);
			},

			level03: function(exp)
			{
				var res = eval(exp);

				spellTester.assertEquals(typeof res, 'string');
				spellTester.assertEquals('those dates will cost 190 gold!', res);
			},

			level04: function(exp)
			{
				delete window.calmReply; 

				$('head').append('<script>'+exp+'</script>');

				spellTester.assertEquals(typeof calmReply, 'string');
				spellTester.assertEquals('those dates will cost 190 gold.', calmReply);
			},

			level05: function(exp)
			{
				var checkImplemented = exp.indexOf('???');

				if (checkImplemented !== -1)
				{
					throw {type:"SpellTest", message:spellTester.getFailureTerm() + " spell: This spell was not implemented."}
				}

				$('head').append('<script>'+exp+'</script>');

				spellTester.assertEquals(typeof haggle, 'function');

				var res = haggle(150);
				spellTester.assertEquals(res, 145);
			}
		}
	}
);