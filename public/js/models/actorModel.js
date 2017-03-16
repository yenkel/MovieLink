var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Actor Model
var actorSchema = new Schema({
    name: String,
    id: Number,
    image: String
});
var Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
