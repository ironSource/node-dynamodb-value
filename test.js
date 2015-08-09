var DynamoDBValue = require('./index')
var expect = require('chai').expect

describe('DynamoDBValue', function() {
	var jsObj = {
		str: '1439057466535',
		num: 123,
		obj: {
			z: '1'
		},
		list: ['123', {
			b: '2'
		}]
	}

	var ddbObject = {
		str: {
			S: '1439057466535'
		},
		num: {
			N: '123'
		},
		obj: {
			M: {
				z: {
					S: '1'
				}
			}
		},
		list: {
			L: [{
				S: '123'
			}, {
				M: {
					b: {
						S: '2'
					}
				}
			}]
		}
	}

	it('converts from dynamodb to a javascript', function() {
		expect(DynamoDBValue.toJavascript(ddbObject)).to.deep.equal(jsObj)
	})

	it('converts from javascript to dynamodb', function() {
		expect(DynamoDBValue.toDDB(jsObj)).to.deep.equal(ddbObject)
	})
})
