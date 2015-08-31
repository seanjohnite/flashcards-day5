app.controller('NewCardController', function ($scope, FlashCardsFactory, $rootScope) {
	$scope.categories = FlashCardsFactory.categories;
	function resetCard () {
		$scope.newCard = {
		    question: null,
		    category: '',
		    answers: [
		        { text: null, correct: false },
		        { text: null, correct: false },
		        { text: null, correct: false }
		    ]
		};
	}
	$scope.saveCard = function () {
		FlashCardsFactory.createCard($scope.newCard)
		.then(function (createdCard) {
			// $rootScope.$broadcast('newCard!', createdCard);
			resetCard();
		});
	};
	resetCard();
});