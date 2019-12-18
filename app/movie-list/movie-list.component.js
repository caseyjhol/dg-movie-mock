(function() {
	angular
		.module('movieList')
		.component('movieList', {
			controller: MovieListCtrl,
			templateUrl: 'app/movie-list/movie-list.html'
		});

	MovieListCtrl.$inject = ['Movies'];

	function MovieListCtrl (Movies) {
		var ctrl = this;

		ctrl.decades = [];
		ctrl.filterMovies = filterMovies;

		Movies.getMovies()
			.then(function (data) {
				ctrl.movies = data;
				return ctrl.movies;
			});

		function filterMovies (decade) {
			if (decade === ctrl.currentDecade) {
				return ctrl.currentDecade = undefined;
			}

			ctrl.currentDecade = decade;
		}
	}
})();