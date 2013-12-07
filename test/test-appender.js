var TestAppender = function(){
	this.log = [];
};

TestAppender.prototype.doAppend = function(entry){
	this.log.push(entry);
};

TestAppender.prototype.getLogs = function(){
	return this.log;
}

TestAppender.prototype.countEntries = function(){
	return this.log.length;
}

module.exports.TestAppender = TestAppender;