var layout = require('./layout.js');

var ColorConsoleAppender = function(options){
	if(options)
	{
		this.useLocalTime = options.useLocalTime || false;
		this.categoryPrefix = options.categoryPrefix || undefined;
		this.markerPrefix = options.markerPrefix || undefined;
	}
	this.console = console.log.bind(console);
};

ColorConsoleAppender.prototype.doAppend = function(entry){
	if(entry.category && this.categoryPrefix){
		if(entry.category.indexOf(this.categoryPrefix) != 0)
		{
			return;
		}
	}
	if(entry.marker && this.markerPrefix){
		if(entry.marker.indexOf(this.markerPrefix) != 0){
			return;
		}
	}
	this.console(
		getStartColor(entry.level)
		+ "[" + layout.formatMoment(this.useLocalTime, entry.time) + "]"
		+ " "
		+ "[" + layout.getLevelName(entry.level) + "]"
		+ " "
		+ entry.category 
		+ " - "
		+ entry.msg
		+ getEndColor(entry.level)
	);
};

var levelColors = [
	'black',
	'red',
	'yellow',
	'black',
	'cyan',
	'gray'
];

var colorCodes = {
	'black' : {start: '\x1B[90m', end : '\x1B[39m'},
	'red' : {start: '\x1B[31m', end : '\x1B[39m'},
	'yellow' : {start: '\x1B[33m', end : '\x1B[39m'},
	'green': {start: '\x1B[32m', end : '\x1B[39m'},
	'cyan': {start: '\x1B[36m', end : '\x1B[39m'},
	'gray': {start: '\x1B[90m', end : '\x1B[39m'}
};

var getStartColor = function(level){
	return colorCodes[levelColors[level]].start;
}

var getEndColor = function(level){
	return colorCodes[levelColors[level]].end;
}

module.exports.ColorConsoleAppender = ColorConsoleAppender;