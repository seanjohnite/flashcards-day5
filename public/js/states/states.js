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

});