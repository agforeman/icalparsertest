var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

// user schema
var CleaningSchema = new Schema({
    stay: String,
    start: String,
    end: String,
    property: Number,
    cleaner: Number,
    cleaned: { type: Boolean, default: false}
});

module.exports = mongoose.model('Cleaning', CleaningSchema);