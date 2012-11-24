define({
	// Get a past tense verb for failed spells
	getFailureTerm: function()
	{
		var failureTerms = [
			'Blundered',
			'Failed',
			'Fizzled',
			'Aborted',
			'Flopped',
			'Misfired'
		];
		
		randNum = Math.floor(Math.random() * failureTerms.length);

		return failureTerms[randNum];
	},

	// Assertions
	assertFail: function()
	{
		throw {type:"SpellTest", message:this.getFailureTerm() + " spell'"};
	},
	assertEquals: function(lhs, rhs)
	{
		if (lhs != rhs) {
			throw {type:"SpellTest", message:this.getFailureTerm() + " spell: '" + lhs + "' != '" + rhs + "'"};
		}
	},
	assertNotEquals: function(lhs, rhs)
	{
		if (lhs == rhs)
		{
			throw {type:"SpellTest", message:this.getFailureTerm() + " spell: '" + lhs + "' == '" + rhs + "'"};
		}
	},
	assertTrue: function(value)
	{
		if (!value)
		{
			throw {type:"SpellTest", message:this.getFailureTerm() + " spell: '" + value + "' is not true"};
		}
	},
	assertFalse: function(value)
	{
		if (value)
		{
			throw {type:"SpellTest", message:this.getFailureTerm() + " spell'" + value + "' is not false"};
		}
	}
});
