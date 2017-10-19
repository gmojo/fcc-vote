var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({

    pollName: String,
    createdBy: String,
    createdOn: {type: Date, default: Date.now},
    votesCast: [{by: String, option: String}],
    pollData: [{key: String, value: Number}]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Poll', pollSchema);
