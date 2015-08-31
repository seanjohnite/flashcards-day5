'use strict';
/* global app */
app.directive('loader', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/loader.html'
  };
});
