app.service('service', function($http) {

    //function for finding list of movie's based on user input search
    var searchTitle = function(titleMovie) {
        console.log("you are searching for: " + titleMovie);
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/search/movie" + '?query=' + titleMovie + '&api_key=' + api_key
        }).then(function successCallback(response) {
            angular.copy(response.data.results, resultByTitle);
        }, function errorCallback(data) {

        });
    };

    //array for holding movie search results
    var resultByTitle = [];

    //after picking a movie from search, hold the cast information to check against
    //next link actor input
    var searchCast = function(movieId) {
        console.log(movieId);
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key
        }).then(function successCallback(response) {
            var castIds = [];
            for (i = 0; i < response.data.cast.length; i++) {
                castIds.push(response.data.cast[i].id);
            };
            console.log("the cast for " + movieId + " is: " + castIds);
            angular.copy(castIds, cast);
            this.titleMovie = "";
            this.resultByTitle = [];
        }, function errorCallback(data) {
            console.log(data.data);
        });

    };

    // on movie selection store the movie's cast to check against next link actor input
    var cast = [];

    //function for retrieving results of user input to find actor
    var searchActor = function(actorName) {
        console.log("you are looking for: " + actorName);
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/search/person?api_key=" + api_key + "&language=en-US&query=" + actorName + "&page=1&include_adult=false"
        }).then(function successCallback(response) {
            angular.copy(response.data.results, resultByActor);
        }, function errorCallback(data) {

        });
    };

    //array for listing results of general actor search
    var resultByActor = [];

    // search with actor's id to find their *credits*
    var searchPersonId = function(personId) {
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + api_key
        }).then(function successCallback(response) {
            var creditIds = []
            for (i = 0; i < response.data.cast.length; i++) {
                creditIds.push(response.data.cast[i].id);
            };
            console.log("these are " + personId + "'s credits:" + creditIds)
            angular.copy(creditIds, credits);
            this.actorName = "";
            this.resultByActor = [];
        }, function errorCallback(data) {
            console.log(data.data);
        });
    };

    //  on actor selection, store their credits to check against next link movie input
    var credits = [];


    // INITIAL MOVIE LIST DISPLAY
    //function for retrieving popular movies and making display list
    var searchPopular = function() {
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1"
        }).then(function successCallback(response) {
            angular.copy(response.data.results, displayRightList);
        }, function errorCallback(data) {

        });
    };

    //function for retrieving top rated movies and making display list
    var searchTopRated = function() {
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/top_rated?api_key=" + api_key + "&language=en-US&page=1"
        }).then(function successCallback(response) {
            angular.copy(response.data.results, displayRightList);
        }, function errorCallback(data) {

        });
    };

    //function for retrieving current movies and making display list
    var searchNowPlaying = function() {
        var api_key = "8827ea31eb495768c6d732582c199ecc";
        $http({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key + "&language=en-US&page=1"
        }).then(function successCallback(response) {
            angular.copy(response.data.results, displayRightList);
        }, function errorCallback(data) {

        });
    };

    //array for showing beginning movie lists
    var displayRightList = [];


    //LINKS
    //object and array for showing user's movie and actor links/selections
    var links = {
        movies: [],
        actors: [],
        ids: []
    };

    //function for adding specific movie to links obj
    var addMovieLink = function(movie) {
        links.movies.push(movie);
        console.log("you added " + movie.title + " to your links");
    };

    //function for adding specific actor to links obj
    var addActorLink = function(actor) {
        links.actors.push(actor);
        console.log("you added " + actor.name + " to your links")
    };




    //exporting functions to the controller
    return {

        links: links,
        addMovieLink: addMovieLink,
        addActorLink: addActorLink,
        searchTitle: searchTitle,
        resultByTitle: resultByTitle,
        searchCast: searchCast,
        cast: cast,
        credits: credits,
        searchPersonId: searchPersonId,
        searchPopular: searchPopular,
        searchTopRated: searchTopRated,
        searchNowPlaying: searchNowPlaying,
        resultByActor: resultByActor,
        searchActor: searchActor,
        displayRightList: displayRightList

    };
});
