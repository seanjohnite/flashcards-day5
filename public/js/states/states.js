// Right now, we have everything in our application on one page, including our statistics panel, our new flash card form and our flash cards view. Let's build three states that will show these parts of our applications separately.

// stats state
app.config(function ($stateProvider) {

  function statsController($scope, ScoreFactory) {
    $scope.scores = ScoreFactory.scores;
  }

  $stateProvider.state('stats', {
    url: '/stats',
    templateUrl: '/js/states/statsPage.html',
    controller: statsController
  });

  function newCardController($scope, FlashCardsFactory, $rootScope) {
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
  }

  $stateProvider.state('newCard', {
    url: '/newCard',
    templateUrl: '/js/states/newCardForm.html',
    controller: newCardController
  });

  function mainController($scope, FlashCardsFactory, $log, ScoreFactory) {

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

    $scope.getCategoryCards();
  }

  $stateProvider.state('cards', {
    url: '/',
    templateUrl: '/js/states/allCards.html',
    controller: mainController
  });

  // function manageController($scope, FlashCardsFactory, $stateParams) {
  //   FlashCardsFactory.getOneFlashCard($stateParams.cardId)
  //   .then(function(card){
  //     $scope.card = card;
  //   });
  // }

  $stateProvider.state('manageCard', {
    url: '/:cardId',
    templateUrl: '/js/states/manageCard.html'
    // controller: manageController
  })

  function editController ($scope, FlashCardsFactory, $state, $stateParams) {
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
  }

  $stateProvider.state('manageCard.edit', {
    url: '/edit',
    templateUrl: '/js/states/editCard.html',
    controller: editController
  })

  function deleteController ($scope, FlashCardsFactory, $state, $stateParams) {
    $scope.deleteCard = function() {
      FlashCardsFactory.deleteFlashCard($stateParams.cardId)
      .then(function(){
        $state.go('cards');
      })
      .then(null, console.error.bind(console));
    }

    $scope.back = function () {
      $state.go('^');
    }
  }

  $stateProvider.state('manageCard.delete', {
    url: '/delete',
    templateUrl: '/js/states/deleteCard.html',
    controller: deleteController
  })
});
