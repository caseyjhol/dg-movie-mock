(function() {
	angular
		.module('movieItem')
		.component('movieItem', {
			require: {
				parent: '^^movieList'
			},
			controller: MovieItemCtrl,
			bindings: {
				movie: '<'
			},
			templateUrl: 'app/movie-item/movie-item.html'
		});

	MovieItemCtrl.$inject = ['Movies'];

	function MovieItemCtrl (Movies) {
		var ctrl = this;

		ctrl.$onInit = function () {
			Movies.getMovieData(ctrl.movie.imdbID)
				.then(function (data) {
					ctrl.movie = angular.extend(ctrl.movie, data);
					ctrl.movie.decade = Math.floor(ctrl.movie.Released.split(' ')[2] / 10) * 10;

					if (ctrl.parent.decades.indexOf(ctrl.movie.decade) === -1) {
						ctrl.parent.decades.push(ctrl.movie.decade);
					}

					return ctrl.movie;
				});
		}
	}
})();