var should = require('chai').should();
var douyu = require('../index');

describe("#initialize", function(){
	it('initializes correctly', function(){
		new douyu.ChatRoom("584854");
	});
});



