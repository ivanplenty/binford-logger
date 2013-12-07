var should = require('should');
var Logger = require('../lib/logger.js');
var ConsoleAppender = require('../lib/appender/console.js').ConsoleAppender;
var ColorConsoleAppender = require('../lib/appender/color-console.js').ColorConsoleAppender;
var testAppenderLib = require('./test-appender.js');

describe('Logger', function(){
	it('should append a test logger', function(){
		var l = Logger.loggerFactory(3, "test-log");

		l.should.not.be.empty;

		var testAppender = new testAppenderLib.TestAppender();
		testAppender.should.not.be.empty;
		testAppender.countEntries().should.be.eql(0);

		l.addAppender(testAppender, null, 5);

		l.error("first error");
		testAppender.countEntries().should.be.eql(1);
		l.warn("second msg");
		testAppender.countEntries().should.be.eql(2);
		l.info("third msg");
		testAppender.countEntries().should.be.eql(3);
		l.debug("fourth msg");
		testAppender.countEntries().should.be.eql(3);
		l.trace("fifth msg");
		testAppender.countEntries().should.be.eql(3);
	});

	it('should append to the console logger', function(){
		var l = Logger.loggerFactory(5, "test-log-console");

		l.should.not.be.empty;

		var consoleAppender = new ConsoleAppender();
		consoleAppender.should.not.be.empty;

		l.addAppender(consoleAppender, null, 5);

		l.error("first error");
		l.warn("second msg");
		l.info("third msg");
		l.debug("fourth msg");
		l.trace("fifth msg");
	});

	it('should append to the color console logger', function(){
		var l = Logger.loggerFactory(5, "test-log-color");

		l.should.not.be.empty;

		var consoleAppender = new ColorConsoleAppender();
		consoleAppender.should.not.be.empty;

		l.addAppender(consoleAppender, null, 5);

		l.error("first error");
		l.warn("second msg");
		l.info("third msg");
		l.debug("fourth msg");
		l.trace("fifth msg");
	});

	it('should handle multiple appenders', function(){
		var l = Logger.loggerFactory(5, "test-log-color");

		l.should.not.be.empty;

		var consoleAppender = new ConsoleAppender();
		var colorConsoleAppender = new ColorConsoleAppender({useLocalTime: true});
		var testAppender = new testAppenderLib.TestAppender();
		consoleAppender.should.not.be.empty;
		colorConsoleAppender.should.not.be.empty;
		testAppender.should.not.be.empty;
		testAppender.countEntries().should.be.eql(0);

		l.addAppender(consoleAppender, null, 5);
		l.addAppender(colorConsoleAppender, null, 5);
		l.addAppender(testAppender, null, 5);

		l.error("first error");
		testAppender.countEntries().should.be.eql(1);
		l.warn("second msg");
		testAppender.countEntries().should.be.eql(2);
		l.info("third msg");
		testAppender.countEntries().should.be.eql(3);
		l.debug("fourth msg");
		testAppender.countEntries().should.be.eql(4);
		l.trace("fifth msg");
		testAppender.countEntries().should.be.eql(5);
	});

	it('should not support detaching individual appenders', function(){
		var l = Logger.loggerFactory(5, "test-log-color");

		l.should.not.be.empty;

		var testAppender = new testAppenderLib.TestAppender();
		testAppender.should.not.be.empty;
		testAppender.countEntries().should.be.eql(0);

		l.addAppender(testAppender, null, 5);

		(function(){
			l.detachAppender("no-name");
		}).should.throw();
	});

	it('should support detaching all appenders', function(){
		var l = Logger.loggerFactory(5, "test-log-color");

		l.should.not.be.empty;

		var testAppender = new testAppenderLib.TestAppender();
		testAppender.should.not.be.empty;
		testAppender.countEntries().should.be.eql(0);

		l.addAppender(testAppender, null, 5);

		l.error("first error");
		testAppender.countEntries().should.be.eql(1);
		l.warn("second msg");
		testAppender.countEntries().should.be.eql(2);

		l.detachAndStopAllAppenders();
		l.error("first error");
		testAppender.countEntries().should.be.eql(2);
		l.warn("second msg");
		testAppender.countEntries().should.be.eql(2);
	});
});