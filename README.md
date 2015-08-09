# dynamodb-value (WIP) [![Build Status](https://secure.travis-ci.org/ironSource/node-dynamodb-value.png?branch=master)](http://travis-ci.org/ironSource/node-dynamodb-value)

Convert javascript object into dynamodb schema and back. 

For a more complete solution use [official sdk from aws](https://github.com/awslabs/dynamodb-document-js-sdk)

```javascript
    var DynamoDBValue = require('dynamodb-value')
    
    var jsObj = {
        str: '1439057466535',
        num: 123,
        obj: { z: '1' },
        list: ['123', { b: '2' }]
    }

    var ddbObject = {
        str: { S: '1439057466535' },
        num: { N: '123' },
        obj: {M: { z: { S: '1' }}},
        list: { L: [ { S: '123' }, { M: { b: { S: '2' }}}] }
    }

    DynamoDBValue.toJavascript(ddbObject) // deeply equal jsObj
    DynamoDBValue.toDDB(jsObj) // deeply equal ddbObject
```