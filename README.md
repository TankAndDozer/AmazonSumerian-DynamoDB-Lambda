# AmazonSumerian-DynamoDB-Lambda
Amazon Sumerian example with DynamoDB and Lambda functions

[Example Scene])(http://bit.ly/2GtTywz)

[Screencast]()

## Tutorial

### IAM Inline Policies

Add the IAM inline policies to your Cognito Identity Role.  This role is the one created by the Cloud Formation Stack from the [tutorial](https://docs.sumerian.amazonaws.com/tutorials/create/beginner/aws-setup/) by the Sumerian team.

Update the ARN in the policies to match your Lambda functions.

### Lambda Functions

Create the UpdateCookie Lambda function.  When doing this generate your own service role for this function.  In this example it's called sumerianTutorialCookies.

When you create the GetCookie Lambda function reuse the existing role that you just created.  You must update sumerianTutorialCookies to inlude the resource name of the new function.

#### Lambda service-role

The generated service-role should have two inline policies and look similar to this:

AWSLambdaBasicExecutionRole-******************
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:**************************:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:**************************:log-group:/aws/lambda/sumerianTutorialUpdateItem:*",
                "arn:aws:logs:**************************:log-group:/aws/lambda/sumerianTutorialGetItem:*"
            ]
        }
    ]
}
```

AWSLambdaMicroserviceExecutionRole-******************
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:us-west-2:633545525383:table/sumerianTutorialCookies"
        }
    ]
}
```

### Sumerian Scene

Create it as you like.  The Cookie script can be attached to an Empty entity, while the other scripts may be included inside state machines that will invoke them on click or whatever action you like.