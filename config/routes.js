const path = require('path')
const Poll = require('./models/poll')
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID; 

module.exports = function(app, passport) {

    // Database API ===================================================================
    // Get all polls from database
    app.get('/api/polls', function(req, res) {
        Poll.find({}, function(err, polls) {
            if(err) {
                res.send(err)
            }
            res.json(polls)
        })
    })

    // Get single poll based on ID
    app.get('/api/polls/:id', function(req, res) {
        let pollId = new ObjectID(req.params.id)

        Poll.findById(pollId, function (err, poll){
            if(err) {
                res.send(err)
            }
            res.send(poll)
        });
    })

    // Add new poll to database
    app.post('/api/newpoll', function(req, res) {
        let newPoll = new Poll()

        newPoll.pollName = req.body.pollName
        newPoll.createdBy = req.body.createdBy
        newPoll.pollData = req.body.pollData

        newPoll.save(function(err, doc) {
            if (err)
                res.send(err);
                
            console.log('Document added with ID: ', doc.id)
            res.sendStatus(200)
        });

    })

    // Vote in poll
    app.post('/api/vote/:id', function(req, res) {
        let option = req.body.option
        let pollId = new ObjectID(req.params.id)
        let vote = {'by': 'gmojo', 'option': option}

        // Add user and vote to votesCast array then update count in pollData
        mongoose.connection.db.collection('polls').update({_id: pollId}, {$push: { 'votesCast': vote }})
        mongoose.connection.db.collection('polls').update({_id: pollId, "pollData.key": option}, {$inc: {"pollData.$.value": 1}})

        res.sendStatus(200)

    })

    // Add poll option
    app.post('/api/option/:id', function(req, res) {
        let option = req.body
        let pollId = new ObjectID(req.params.id)

        mongoose.connection.db.collection('polls').update({_id: pollId}, {$push: { 'pollData': option }})
        res.sendStatus(200)
    })


    //  Authentication ==============================================================
    // User api
    app.get('/api/user', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        res.setHeader('Access-Control-Allow-Credentials', true)

        if(req.user) {
            res.json(req.user)
        } else {
            res.status(404).send('User not found')
        }
    })

    // LOGOUT
    app.get('/logout', function(req, res) {
        // req.logout will remove the req.user property and clear the session
        req.logout()
        res.redirect('/')
    })

    // GOOGLE Auth
    app.get('/auth/google', passport.authenticate('google', {
        scope : ['profile', 'email'] 
        }))

    app.get('/auth/google/callback', passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }))

    // GITHUB Auth
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }))

	
    // Serve React =========================================================
    // Any request that doesn't match one above, send back React's index.html.
	app.get('*', (req, res) => {
	    res.sendFile(path.join(__dirname+'/../client/build/index.html'))
	})

}