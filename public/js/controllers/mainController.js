app.controller('mainController', function($scope, service) {

    //'import' functions from service
    $scope.links = service.links;
    $scope.addActorLink = service.addActorLink;
    $scope.searchTitle = service.searchTitle;
    $scope.resultByTitle = service.resultByTitle;
    $scope.searchCast = service.searchCast;
    $scope.cast = service.cast;
    $scope.credits = service.credits;
    $scope.searchPersonId = service.searchPersonId;
    $scope.searchPopular = service.searchPopular;
    $scope.searchTopRated = service.searchTopRated;
    $scope.searchNowPlaying = service.searchNowPlaying;
    $scope.resultByActor = service.resultByActor;
    $scope.searchActor = service.searchActor;
    $scope.displayRightList = service.displayRightList;

    //function for finding movie from input
    $scope.searchTitle = function() {
        service.searchTitle($scope.titleMovie);
    };

    //function for adding movie to links (from search or list)
    $scope.addMovieLink = function(movie) {
        var newMovie = {
            title: movie.title,
            year: movie.release_date,
            id: movie.id,
            rating: movie.vote_average,
            img: "http://image.tmdb.org/t/p/w154" + movie.backdrop_path
        };
        service.addMovieLink(newMovie);
        service.links.ids.push(movie.id);



    };

    //when user chooses the actor after searching for them
    //add the movie's information to links array
    $scope.addActorLink = function(actor) {

        var newActor = {
            name: actor.name,
            id: actor.id,
            img: "http://image.tmdb.org/t/p/w154" + actor.profile_path
        };
        service.addActorLink(newActor);
        service.links.ids.push(actor.id);
    };

    //function for: check the actor selected against cast of previous link
    //and actor links (previously selected actors)
    //ON SUCCESS:
    //retrieve their credits to check against next movie select
    //add their information to links
    //then toggle to have user look for next movie link
    $scope.checkActor = function(actor) {
        console.log($scope.links.actors.indexOf({ id: actor.id }));
        if ($scope.cast.indexOf(actor.id) == -1) {
            console.log("the actor isn't in the cast");
            return false;
        } else if ($scope.links.ids.indexOf(actor.id) != -1) {
            console.log("you already picked this actor");
            return false;
        } else {
            service.searchPersonId(actor.id);
            $scope.addActorLink(actor);
            $scope.toggleMovieActor();
        }
    };

    //function that checks movie selected against movie links/credits
    //ON SUCCESS:
    //retrieve the cast to check against next actor select
    //add movie with info to links
    //then toggle to have user look for next actor link
    $scope.checkMovie = function(movie) {
        if ($scope.credits.indexOf(movie.id) == -1) {
            console.log("the actor isn't in that movie");
            return false;
        } else if ($scope.links.ids.indexOf(movie.id) != -1) {
            console.log("you already picked this movie");
            return false;
        } else {
            service.searchCast(movie.id);
            $scope.addMovieLink(movie);
            $scope.toggleMovieActor();
        }
    };

    //test function for ng-click
    $scope.test = function() {
        console.log(this);
    };

    //Variables to show/hide the pages
    $scope.play = false;

    $scope.playing = function() {
        $scope.play = true;
    };

    //vars to toggle actor/movie search
    $scope.nextActor = true;

    $scope.nextMovie = false;

    $scope.toggleMovieActor = function() {
        $scope.nextActor = !$scope.nextActor;
        $scope.nextMovie = !$scope.nextMovie;
    };


    //Invoke get Popular movies to display when the page opens
    $scope.searchPopular();

});
