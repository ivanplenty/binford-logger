var should = require('should');
var Logger = require('../lib/logger.js');
var ConsoleAppender = require('../lib/appender/console.js').ConsoleAppender;
var ColorConsoleAppender = require('../lib/appender/color-console.js').ColorConsoleAppender;
var testAppenderLib = require('./test-appender.js');

describe('Markers', function(){
	it('should support markers', function(){
		var l = Logger.loggerFactory(3, "test-logm");

		l.should.not.be.empty;

		var testAppender = new testAppenderLib.TestAppender();
		testAppender.should.not.be.empty;
		testAppender.countEntries().should.be.eql(0);

		l.addAppender(testAppender, null, 5);

		l.errorm("user1", "first error");
		testAppender.countEntries().should.be.eql(1);
		l.warnm("user1", "second msg");
		testAppender.countEntries().should.be.eql(2);
		l.infom("user1", "third msg");
		testAppender.countEntries().should.be.eql(3);
		l.debugm("user1", "fourth msg");
		testAppender.countEntries().should.be.eql(3);
		l.tracem("user1", "fifth msg");
		testAppender.countEntries().should.be.eql(3);
	});

	it('should discrimate appenders based on markers', function(){
		var l = Logger.loggerFactory(3, "test-logm-filter");

		l.should.not.be.empty;

		var testAppender1 = new testAppenderLib.TestAppender();
		testAppender1.should.not.be.empty;
		testAppender1.countEntries().should.be.eql(0);

		l.addAppender(testAppender1, "user1", 5);

		var testAppender2 = new testAppenderLib.TestAppender();
		testAppender2.should.not.be.empty;
		testAppender2.countEntries().should.be.eql(0);

		l.addAppender(testAppender2, "user2", 5);

		l.errorm("user1", "first error");
		testAppender1.countEntries().should.be.eql(1);
		testAppender2.countEntries().should.be.eql(0);
		l.errorm("user2", "first error");
		testAppender1.countEntries().should.be.eql(1);
		testAppender2.countEntries().should.be.eql(1);
		
		l.warnm("user2", "second msg");
		testAppender1.countEntries().should.be.eql(1);
		testAppender2.countEntries().should.be.eql(2);
		l.warnm("user1", "second msg");
		testAppender1.countEntries().should.be.eql(2);
		testAppender2.countEntries().should.be.eql(2);
		
		l.warnm("user3", "second msg");
		testAppender1.countEntries().should.be.eql(2);
		testAppender2.countEntries().should.be.eql(2);

		l.warn("second msg");
		testAppender1.countEntries().should.be.eql(2);
		testAppender2.countEntries().should.be.eql(2);

		l.infom("user1", "third msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(2);
		l.infom("user2", "third msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(3);

		l.debugm("user1", "fourth msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(3);
		l.debugm("user2", "fourth msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(3);

		l.tracem("user1", "fifth msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(3);
		l.tracem("user2", "fifth msg");
		testAppender1.countEntries().should.be.eql(3);
		testAppender2.countEntries().should.be.eql(3);
	});

	it('should support marker callback functions', function(){
		var l = Logger.loggerFactory(3, "test-logm-filter");

		l.should.not.be.empty;

		var testAppender1 = new testAppenderLib.TestAppender();
		testAppender1.should.not.be.empty;
		testAppender1.countEntries().should.be.eql(0);

		l.addAppender(testAppender1, function(marker){
			return (Number(marker) % 2 == 0);
		}, 5);


		var count = 0;
		for(var i=0;i<9999;i++){
			if(i % 2 == 0)
				count++;
			l.errorm(i, "numbered error");
			testAppender1.countEntries().should.be.eql(count);
		}
	})
});