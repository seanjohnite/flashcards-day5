app.directive('borderHover', function(){
  return {
    restrict: 'AC',
    link: function(scope, element){
      var border;
      element.on('mouseenter', function(){
        border = element.css('border');
        element.css('border', 'solid 5px black');
      });
      element.on('mouseleave', function(){
        element.css('border', border);
      });
    }
  };
});
