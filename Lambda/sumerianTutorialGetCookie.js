const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    console.log('processing event: %j', event);

    let params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            "cookie": event.cookie
        }
    };

    docClient.get(params, function(err,data) {
        if (err) {
            callback(err, null);
        } else {
            console.log('data = %j', data);
            callback(null, data);
        }
    });
}