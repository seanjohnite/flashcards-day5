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