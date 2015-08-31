app.config(function ($stateProvider) {
  $stateProvider.state('stats', {
    url: '/stats',
    templateUrl: '/js/states/views/statsPage.html',
    controller: 'StatsController'
  })
  .state('newCard', {
    url: '/newCard',
    templateUrl: '/js/states/views/newCardForm.html',
    controller: 'NewCardController'
  })
  .state('cards', {
    url: '/',
    templateUrl: '/js/states/views/allCards.html',
    controller: 'MainController'
  })
  .state('manageCard', {
    url: '/:cardId',
    templateUrl: '/js/states/views/manageCard.html'
  })
  .state('manageCard.edit', {
    url: '/edit',
    templateUrl: '/js/states/views/editCard.html',
    controller: 'EditCardController'
  })
  .state('manageCard.delete', {
    url: '/delete',
    templateUrl: '/js/states/views/deleteCard.html',
    controller: 'DeleteCardController'
  });
});
