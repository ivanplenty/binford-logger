module.exports = require('./lib/logger.js');

module.exports.getAppender = function(name){
	if(name == 'color-console')
		return require('./lib/appender/color-console.js').ColorConsoleAppender;
	else if (name == 'console')
		return require('./lib/appender/console.js').ConsoleAppender;
	else
		return require('./lib/appender/color-console.js').ColorConsoleAppender;
}

module.exports.getDefaultAppender = function(){
	return new (module.exports.getAppender('color-console'));
}