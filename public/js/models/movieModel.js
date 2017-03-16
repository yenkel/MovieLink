var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Movie Model
var movieSchema = new Schema({
    name: String,
    id: Number,
    year: Number,
    image: String
});
var Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;
