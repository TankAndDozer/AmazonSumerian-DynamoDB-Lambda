'use strict';
	
// The sumerian object can be used to access Sumerian engine
// types.
//
/* global sumerian */

// Called when play mode starts.
//
function setup(args, ctx) {
}

// When used in a ScriptAction, called when a state is entered.
// Use ctx.transitions.success() to trigger the On<State>Success transition
// and ctx.transitions.failure() to trigger the On<State>Failure transition
function enter(args, ctx) {
	
	var lambdaParams = {
		FunctionName: args.lambdaGetCookie,
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify( { cookie: ctx.worldData.cookie } )
	}

	ctx.worldData.lambda.invoke( lambdaParams, function ( error, data ) {

		console.log( 'getCookie: ' + ctx.worldData.cookie );

		if ( error ) {

			console.error( 'Unable to invoke lambdaGetCookie' );
			console.error( error );
			ctx.transitions.failure();

		} else {

			if ( Object.is( data.Payload, "{}" )) {
				
				console.log('Cookie does not exist');
				ctx.transitions.failure();
				
			} else {
				
				let payload = JSON.parse( data.Payload );
				console.log(payload);
				
				let d = new Date(parseInt(payload.Item.lastClicked));
				console.log( "lastClicked: " + d );
				
				ctx.transitions.success();
			}
		}
	} );	
}
	
// When used in a ScriptAction, called when a state is exited.
//
function exit(args, ctx) {
}
	
// Called when play mode stops.
//
function cleanup(args, ctx) {
}

// Defines script parameters.
//
var parameters = [
	{type: 'string', key: 'lambdaGetCookie', 'default': 'arn:aws:lambda:', description: 'Lambda Function GetCookie'},
];
