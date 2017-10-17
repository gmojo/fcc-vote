const path = require('path');

module.exports = function(app, passport) {

    // LOGOUT
    app.get('/logout', function(req, res) {
        // req.logout will remove the req.user property and clear the session
        req.logout();
        res.redirect('/');
    });

    // User api
    app.get('/api/user', function(req, res) {
        if(req.user) {
            res.json(req.user)
        } else {
            res.status(404).send('User not found')
        }
    })

    // GOOGLE ROUTES
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));

    // GITHUB ROUTES
    app.get('/auth/github', passport.authenticate('github'));
    // the callback after github has authenticated the user
    app.get('/auth/github/callback',
            passport.authenticate('github', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get('*', (req, res) => {
	    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	});

}