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