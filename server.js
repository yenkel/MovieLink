//use express dependancy for node work
var express = require('express');
var app = express();
var Movie = require("./public/js/models/movieModel.js");
var Actor = require("./public/js/models/actorModel.js");

//use mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/collection");


//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port (heroku publication)
var port = /*process.env.PORT ||*/ 8080;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//API routes
app.get('/collection', function(req, res, next) {
    Movie.find(function(error, movies) {
        if (error) {
            console.error(error)
            return next(error);
        } else {
            res.send(movies);
        }
    });
});

app.post('/collection', function(req, res, next) {
    var movie = new Movie(req.body);

    movie.save(function(err, movie) {
        if (err) {
            console.error(err)
            return next(err);
        } else {
            res.json(movie);
        }
    });
});

app.delete('/collection/:id', function(req, res, next) {
    //Movie.find({_id: req.par})
    Movie.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.error(err)
            return next(err);
        } else {
            res.json("Movie Deleted!");
        }
    });
});

app.put('/collection/:id', function(req, res, next) {
    Movie.findOneAndUpdate({ _id: req.param.id }, req.body, { new: true }, function(err, movie) {
        if (err) {
            console.error(err)
            return next(err);
        } else {
            res.send(movie);
        }
    });
});





// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

//start listening
app.listen(port, function() {
    console.log(port + " is listening");
});
