/*****************/
/* SPELL CASTERS
/*****************/

castSpell = function(spellName, param)
{
	try
	{
		if (typeof param === 'undefined')
		{
			spellTests[spellName]();
		}
		else
		{
			spellTests[spellName](param);
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
};

function hocusPocus(spell)
{
	var spellText = $('#spell').val();
	var res = castSpell(spell, spellText);
	
	if (res !== true)
	{
		alert(res.message);
	}
	else
	{
		alert('on to the next level with you!');
	}
}


/*****************/
/* ASSERTIONS
/*****************/

// Get a past tense verb for failed spells
function getFailureTerm()
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
}

function assertFail()
{
	throw {type:"SpellTest", message:getFailureTerm() + " spell'"};
}

function assertEquals(lhs, rhs)
{
	if (lhs != rhs) {
		throw {type:"SpellTest", message:getFailureTerm() + " spell: '" + lhs + "' != '" + rhs + "'"};
	}
}

function assertNotEquals(lhs, rhs)
{
	if (lhs == rhs)
	{
		throw {type:"SpellTest", message:getFailureTerm() + " spell: '" + lhs + "' == '" + rhs + "'"};
	}
}

function assertTrue(value)
{
	if (!value)
	{
		throw {type:"SpellTest", message:getFailureTerm() + " spell: '" + value + "' is not true"};
	}
}

function assertFalse(value)
{
	if (value)
	{
		throw {type:"SpellTest", message:getFailureTerm() + " spell'" + value + "' is not false"};
	}
}
