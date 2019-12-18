(function() {
	angular
		.module('core.movies')
		.factory('Movies', Movies);

	Movies.$inject = ['$http', '$log', 'apiKey'];

	function Movies ($http, $log, apiKey) {
		var service = {
			getMovies: getMovies,
			getMovieData: getMovieData
		}

		return service;

		function getMovies () {
			return $http.get('http://www.omdbapi.com/?s=Batman' + apiKey)
				.then(getMoviesComplete)
				.catch(getMoviesFailed);

			function getMoviesComplete (response) {
				return response.data.Search;
			}

			function getMoviesFailed (error) {
				$log.error('Error: getMovies failed. ' + error.data);
			}
		}

		function getMovieData (id) {
			return $http.get('http://www.omdbapi.com/?i=' + id + apiKey)
				.then(getMovieDataComplete)
				.catch(getMovieDataCompleteFailed);

			function getMovieDataComplete (response) {
				return response.data;
			}

			function getMovieDataCompleteFailed (error) {
				$log.error('Error: getMovieData failed. ' + error.data);
			}
		}
	}
})();