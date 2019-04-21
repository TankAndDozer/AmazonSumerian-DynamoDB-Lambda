'use strict';
	
// The sumerian object can be used to access Sumerian engine
// types.
//
/* global sumerian */

// Called when play mode starts.
//
function setup(args, ctx) {
	ctx.worldData.lambda = new AWS.Lambda();	
}
	
// When used in a ScriptAction, called when a state is entered.
// Use ctx.transitions.success() to trigger the On<State>Success transition
// and ctx.transitions.failure() to trigger the On<State>Failure transition
function enter(args, ctx) {
	
	var payload = {
		cookie: ctx.worldData.cookie,
		lastClicked: Date.now() + ''
	}
	
	var lambdaParams = {
		FunctionName: args.lambdaUpdateCookie,
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify( payload )
	}

	ctx.worldData.lambda.invoke( lambdaParams, function ( error, data ) {

		console.log( 'updateCookie: ' + ctx.worldData.cookie );

		if ( error ) {

			console.error( 'Unable to invoke lambdaUpdateCookie' );
			console.error( error );
			ctx.transitions.failure();

		} else {

			if ( data.StatusCode === 200 ) {
				ctx.transitions.success();
			} else {
				ctx.transitions.failure();
			}
		}
	} );	
}

// Defines script parameters.
//
var parameters = [
	{type: 'string', key: 'lambdaUpdateCookie', 'default': 'arn:aws:lambda:', description: 'Lambda Function UpdateCookie'},	
];
