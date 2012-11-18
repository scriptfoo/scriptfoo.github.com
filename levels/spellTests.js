var spellTests =
{
	level01: function(str)
	{
		assertEquals(typeof str, 'string')
		assertEquals('"How do you do, fine Earth?"', str);
	},

	level02: function(exp)
	{
		delete window.moniker; 

		$('head').append('<script>'+exp+'</script>');

		assertEquals(typeof moniker, 'string')
		assertEquals('Merlin', moniker);
	},

	level03: function(exp)
	{
		var res = eval(exp);

		assertEquals(typeof res, 'string')
		assertEquals('those dates will cost 190 gold!', res);
	},

	level04: function(exp)
	{
		delete window.calmReply; 

		$('head').append('<script>'+exp+'</script>');

		assertEquals(typeof calmReply, 'string')
		assertEquals('those dates will cost 190 gold.', calmReply);
	},

	level05: function(exp)
	{
		var checkImplemented = exp.indexOf('???');

		if (checkImplemented !== -1)
		{
			throw {type:"SpellTest", message:getFailureTerm() + " spell: This spell was not implemented."}
		}

		$('head').append('<script>'+exp+'</script>');

		assertEquals(typeof haggle, 'function')

		var res = haggle(150);
		assertEquals(res, 145);
	},
};