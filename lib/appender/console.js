var layout = require('./layout.js');

var ConsoleAppender = function(options){
	if(options)
	{
		this.useLocalTime = options.useLocalTime || false;
	}
	this.console = console.log.bind(console);
};

ConsoleAppender.prototype.doAppend = function(entry){
	this.console(
		"[" + layout.formatMoment(this.useLocalTime, entry.time) + "]"
		+ " "
		+ "[" + layout.getLevelName(entry.level) + "]"
		+ " "
		+ entry.category 
		+ " - "
		+ entry.msg
	);
};

module.exports.ConsoleAppender = ConsoleAppender;