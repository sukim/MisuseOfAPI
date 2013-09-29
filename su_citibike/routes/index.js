
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
		pageTitle : 'Misuse of CitiBike'
	};
	res.render('index.html', templateData);
}
