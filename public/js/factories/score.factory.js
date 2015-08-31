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
