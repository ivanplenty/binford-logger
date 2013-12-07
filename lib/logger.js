// This logger is inspired by log4j, but it includes
// the concept of markers and does string formatting automatically

var Logger = function(level, name, options){
	this.appenders = [];
	this.name = name;
	this.level = level;
};

var moment = require('moment');

Logger.prototype.addAppender = function(appender, marker, level){
	this.appenders.push({
		marker: marker,
		level: level || 5,
		appender: appender
	});

}

Logger.prototype.detachAppender = function(name){
	throw "Not supported";
}

Logger.prototype.detachAndStopAllAppenders = function(){
	this.appenders = [];
}

Logger.prototype.error = function(msg){
	this.log(null, 1, msg);
}
Logger.prototype.warn = function(msg){
	this.log(null, 2, msg);
}
Logger.prototype.info = function(msg){
	this.log(null, 3, msg);
}
Logger.prototype.debug = function(msg){
	this.log(null, 4, msg);
}
Logger.prototype.trace = function(msg){
	this.log(null, 5, msg);
}

Logger.prototype.errorm = function(marker, msg){
	this.log(marker, 1, msg);
}
Logger.prototype.warnm = function(marker, msg){
	this.log(marker, 2, msg);
}
Logger.prototype.infom = function(marker, msg){
	this.log(marker, 3, msg);
}
Logger.prototype.debugm = function(marker, msg){
	this.log(marker, 4, msg);
}
Logger.prototype.tracem = function(marker, msg){
	this.log(marker, 5, msg);
}

shouldAppend = function(appender, level, marker)
{
	if(appender.level >= level)
	{
		if(appender.marker)
		{
			if (typeof appender.marker == 'function')
			{
				return appender.marker(marker);
			}
			else
			{
				return appender.marker == marker;
			}
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}

Logger.prototype.log = function(marker, level, msg){
	if(this.level >= level)
	{
		for(var i=0;i<this.appenders.length;i++)
		{
			if(shouldAppend(this.appenders[i], level, marker)){
				this.appenders[i].appender.doAppend({
					time: moment(),
					category: this.name,
					marker: marker,
					level: level,
					msg: msg
				});
			}
			else
			{
			}
		}
	}
}

module.exports.Logger = Logger;

module.exports.loggerFactory = function(level, name, options){
	return new Logger(level, name, options);
}