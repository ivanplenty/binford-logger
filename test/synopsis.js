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

		l.error("error: should see me");
		testAppender.countEntries().should.be.eql(1);
		l.warn("warn: should see me");
		testAppender.countEntries().should.be.eql(2);
		l.info("info: should see me");
		testAppender.countEntries().should.be.eql(3);
		l.debug("debug: should NOT see me");
		testAppender.countEntries().should.be.eql(3);
		l.trace("trace: should NOT see me");
		testAppender.countEntries().should.be.eql(3);
	});

	it('should append to the console logger', function(){
		var l = Logger.loggerFactory(5, "test-log-console");

		l.should.not.be.empty;

		var consoleAppender = new ConsoleAppender();
		consoleAppender.should.not.be.empty;

		l.addAppender(consoleAppender, null, 5);

		l.error("error: should see me");
		l.warn("warn: should see me");
		l.info("info: should see me");
		l.debug("debug: should see me");
		l.trace("trace: should see me");
	});

	it('should append to the color console logger', function(){
		var l = Logger.loggerFactory(5, "test-log-color");

		l.should.not.be.empty;

		var consoleAppender = new ColorConsoleAppender();
		consoleAppender.should.not.be.empty;

		l.addAppender(consoleAppender, null, 5);

		l.error("error: should see me red");
		l.warn("warn: should see me yellow");
		l.info("info: should see me black");
		l.debug("debug: should see me cyan");
		l.trace("trace: should see me gray");
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

		l.error("error: should see me twice: red and black");
		testAppender.countEntries().should.be.eql(1);
		l.warn("warn: should see me twice: yellow and black");
		testAppender.countEntries().should.be.eql(2);
		l.info("info: should see me twice: black and black");
		testAppender.countEntries().should.be.eql(3);
		l.debug("debug: should see me twice: cyan and black");
		testAppender.countEntries().should.be.eql(4);
		l.trace("trace: should see me twice: gray and black");
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

		l.error("error: should see me before detach");
		testAppender.countEntries().should.be.eql(1);
		l.warn("warn: should see me after detach");
		testAppender.countEntries().should.be.eql(2);

		l.detachAndStopAllAppenders();
		l.error("error: should NOT see me after detach");
		testAppender.countEntries().should.be.eql(2);
		l.warn("warn: should NOT see me after detach");
		testAppender.countEntries().should.be.eql(2);
	});

	it('should support category prefix', function(){
		var l1 = Logger.loggerFactory(3, "prefix1/logger");
		var l2 = Logger.loggerFactory(3, "prefix2/logger");

		l1.should.not.be.empty;
		l2.should.not.be.empty;

		var consoleAppender = new ColorConsoleAppender({
			categoryPrefix : "prefix1"
		});
		consoleAppender.should.not.be.empty;

		l1.addAppender(consoleAppender, null, 5);
		l2.addAppender(consoleAppender, null, 5);

		l1.error("prefix1 error: should see me red");
		l1.warn("prefix1 warn: should see me yellow");
		l1.info("prefix1 info: should see me black");
		l1.debug("prefix1 debug: should see me cyan");
		l1.trace("prefix1 trace: should see me gray");

		l2.error("prefix2 error: should NOT see me red");
		l2.warn("prefix2 warn: should NOT see me yellow");
		l2.info("prefix2 info: should NOT see me black");
		l2.debug("prefix2 debug: should NOT see me cyan");
		l2.trace("prefix2 trace: should NOT see me gray");
	});
});