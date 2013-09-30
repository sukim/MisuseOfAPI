
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

/*
	GET /
*/
exports.index = function(req, res) {
	
	console.log("main page requested");
	var templateData = {
		pageTitle : 'Sign Up for a CitiBike Spinning Class!'
	};
	res.render('index.html', templateData);
}
