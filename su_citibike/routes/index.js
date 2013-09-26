
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
		pageTitle : 'Just another normal site'
	};
	res.render('index.html', templateData);
}

exports.opentok = function(req, res) {
	res.render("opentok.html");
}
