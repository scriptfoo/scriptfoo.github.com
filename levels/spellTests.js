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
	}
};