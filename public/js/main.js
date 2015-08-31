var app = angular.module('flashCards', ['ui.router']);

app.value('currentFlashCards', []);
app.controller('DeleteCardController', function ($scope, FlashCardsFactory, $state, $stateParams) {
  $scope.deleteCard = function() {
    FlashCardsFactory.deleteFlashCard($stateParams.cardId)
    .then(function(){
      $state.go('cards');
    })
    .then(null, console.error.bind(console));
  };



  $scope.back = function () {
    $state.go('^');
  };
})
app.controller('EditCardController', function ($scope, FlashCardsFactory, $state, $stateParams) {
  
  $scope.categories = FlashCardsFactory.categories;

  FlashCardsFactory.getOneFlashCard($stateParams.cardId)
  .then(function(card){
    $scope.card = card;
  });

  $scope.saveCard = function () {
    FlashCardsFactory.updateCard($scope.card)
    .then(function (updatedCard) {
      $state.go('cards');
    })
    .then(null, console.error.bind(console));
  };
});
app.controller('MainController', function ($scope, FlashCardsFactory, $log, ScoreFactory) {

  $scope.categories = FlashCardsFactory.categories;
  $scope.selectedCategory;

  $scope.getCategoryCards = function (category) {
    $scope.loading = true;
    FlashCardsFactory.getFlashCards(category)
    .then(function(cards){
      ScoreFactory.reset();
      $scope.selectedCategory = category;
      $scope.flashCards = cards;
    }).catch(function(err){
      $log.error('error getting cards:', err);
    }).finally(function(){
      $scope.loading = false;
    });
  };

  // $scope.$on('newCard!', function (evt, card) {
  //   console.log('evt data', evt);
  //   $scope.flashCards.push(card);
  // });

  $scope.getCategoryCards();
});

app.controller('NewCardController', function ($state, $scope, FlashCardsFactory, $rootScope) {
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
			$state.go('cards');
		});
	};
	resetCard();
});
app.controller('StatsController', function ($scope, ScoreFactory) {
    $scope.scores = ScoreFactory.scores;
});

app.config(function ($stateProvider) {
  $stateProvider.state('stats', {
    url: '/stats',
    templateUrl: '/templates/statsPage.html',
    controller: 'StatsController'
  })
  .state('newCard', {
    url: '/newCard',
    templateUrl: '/templates/newCardForm.html',
    controller: 'NewCardController'
  })
  .state('cards', {
    url: '/',
    templateUrl: '/templates/allCards.html',
    controller: 'MainController'
  })
  .state('manageCard', {
    url: '/:cardId',
    templateUrl: '/templates/manageCard.html'
  })
  .state('manageCard.edit', {
    url: '/edit',
    templateUrl: '/templates/editCard.html',
    controller: 'EditCardController'
  })
  .state('manageCard.delete', {
    url: '/delete',
    templateUrl: '/templates/deleteCard.html',
    controller: 'DeleteCardController'
  });
});

app.factory('FlashCardsFactory', function ($http, currentFlashCards) {

  var categories = [
    'MongoDB',
    'Express',
    'Angular',
    'Node'
  ];

  function getFlashCards (category) {
    var config = {};
    if (category) config.params = { category: category };
    return $http.get('/cards/', config)
    .then(function(response){
      return response.data;
    })
    .then(function (cards) {
      // while (currentFlashCards.length) {
      //   currentFlashCards.pop();
      // }
      // cards.forEach(function (card) {
      //   currentFlashCards.push(card);
      // });
      angular.copy(cards, currentFlashCards);
      return currentFlashCards;
    });
  }
  function createFlashCard (card) {
    return $http.post('/cards', card)
    .then(function (response) {
      return response.data;
    })
    .then(function (card) {
      currentFlashCards.push(card);
      return card;
    });
  }
  function updateFlashCard (card) {
    return $http.put('/cards/' + card._id, card)
    .then(function (response) {
      return response.data;
    });
  }
  function getOneFlashCard (id) {
    return $http.get('/cards/' + id)
    .then(function(response){
      return response.data;
    })
  };
  function deleteFlashCard (id) {
    return $http.delete('/cards/' + id)
    .then(function(response){
      return response.data;
    })
  }

  return {
    getFlashCards: getFlashCards,
    createCard: createFlashCard,
    updateCard: updateFlashCard,
    categories: categories,
    getOneFlashCard: getOneFlashCard,
    deleteFlashCard: deleteFlashCard
  };
});

'use strict';
/* global app */
app.factory('ScoreFactory', function() {

  var scores = {
    correct: 0,
    incorrect: 0
  };

  return {
    scores: scores,
    increase: function(){ ++scores.correct; },
    decrease: function(){ ++scores.incorrect; },
    reset: function(){
      scores.correct = 0;
      scores.incorrect = 0;
    }
  };

});

app.directive('borderHover', function(){
  return {
    restrict: 'AC',
    link: function(scope, element){
      var border;
      element.on('mouseenter', function(){
        border = element.css('border');
        element.css('border', 'solid 5px black');
      });
      element.on('mouseleave', function(){
        element.css('border', border);
      });
    }
  };
});

app.directive('flashCard', function(ScoreFactory){
  return {
    restrict: 'E',
    templateUrl: '/templates/flashcard.html',
    scope: {
      card: '='
    },
    link: function (scope, element, attributes) {
      scope.answerQuestion = function (answer) {
        if (scope.card.answered) return;
        scope.card.answered = true;
        scope.card.answeredCorrectly = answer.correct;
        if (answer.correct) ScoreFactory.increase();
        else ScoreFactory.decrease();
        scope.editing = false;
      };
    }
  };
});

'use strict';
/* global app */
app.directive('loader', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/loader.html'
  };
});
