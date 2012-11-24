define(['app/spells/spellTester'],function(spellTester) {
		return {

			castSpell: function(spellName, param)
			{
				try
				{
					if (typeof param === 'undefined')
					{
						this[spellName]();
					}
					else
					{
						this[spellName](param);
					}
				}
				catch (exception)
				{
					if (exception.type == 'SpellTest')
					{
						return exception;
					}
					else 
					{
						throw exception;
					}
				}
				return true;
			},

			hocusPocus: function(spell, gameEditor)
			{
				var spellText = gameEditor.getSession().getValue();
				var res = this.castSpell(spell, spellText);
				
				if (res !== true)
				{
					alert(res.message);
					return false;
				}
				else
				{
					alert('on to the next level with you!');
					return true;
				}
			},

			// Level Tests
			level01: function(str)
			{
				spellTester.assertEquals(typeof str, 'string');
				spellTester.assertEquals('"How do you do, fine Earth?"', str);
			},

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