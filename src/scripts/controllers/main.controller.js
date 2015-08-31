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
