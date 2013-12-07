var levelNames = ['OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

module.exports.getLevelName = function(level)
{
	if(level >= 0 && level < levelNames.length)
	{
		return levelNames[level];
	}
	else
	{
		return 'OTHER';
	}
}

module.exports.formatMoment = function(useLocal, moment)
{
	if(useLocal)
	{
		return moment.local().toISOString();
	}
	else
	{
		return moment.toISOString();
	}
}