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
  return {
    getFlashCards: getFlashCards,
    createCard: createFlashCard,
    updateCard: updateFlashCard,
    categories: categories
  };
});
