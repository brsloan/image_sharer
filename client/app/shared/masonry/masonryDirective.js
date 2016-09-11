angular.module('imageSharer')
    .directive('layoutImagesAfterRepeat', function() {
      return function(scope, element, attrs) {
        if (scope.$last){
            var elem = document.querySelector('.grid');
            imagesLoaded( elem, function(){
                var msnry = new Masonry( elem, {
                  itemSelector: '.grid-item',
                  columnWidth: '.grid-sizer',
                  percentPosition: true
                });
                
                document.getElementsByClassName('grid')[0].addEventListener('click',function(e){
                  if(e.target.classList.contains('remove-btn')){
                     msnry.remove(e.target.parentElement);
                     msnry.layout();
                  }
                });
            } );
        }
      };
    });