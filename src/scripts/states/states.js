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
