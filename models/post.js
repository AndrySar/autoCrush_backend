/**
 * Created by user on 07.04.17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imageSchema = new Schema({
    url: { type: String, required: true }
});


var carSchema = new Schema({
    mark: { type: String, required: true },
    model: { type: String, required: true },
    stateNumber: { type: String, required: false },
    color: { type: String, required: true }
});

var postSchema = new Schema({
    country: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    urls: [Schema.Types.Mixed],
    cars: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Post', postSchema);

