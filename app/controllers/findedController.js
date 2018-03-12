
/**
 * Finded photo view Controller
 */

app.controller('findedController',['$scope', '$rootScope','requester', function($scope, $rootScope,requester){
  const modal = document.querySelector('.zoom');
  const btnClose = document.querySelector('.closer');
  const image = document.querySelector('.modal-img');

  /**
   * btnClose Listener with method to animate close event
   *
   * @param  {function} function - is animating close event
   */
  btnClose.addEventListener('click', function(){
    let opacity = 1;
    let interval = setInterval(function(){
      opacity = opacity - 0.1;
      modal.style.opacity = opacity;
      if(opacity <= 0){
        clearInterval(interval);
      }
    },50);
    setTimeout(function(){
      modal.style.display = 'none';
    },500);
  });

  /**
   * $scope.showPic - method to animate clicked photo and to show  DateTimeOriginal tag value if exist
   *
   * @param  {$event} event - mouse click event
   */
  $scope.showPic = function(event){
    let exif = requester.getExif(event.path[0].attributes[3].value);
    exif.then(function(data){
      data.forEach(contains);
      function contains(element){
        Object.keys(element).forEach(function(key){
          if(element.tag === "DateTimeOriginal"){
            $scope.exifDate = element;
          }
        });
      };
    });
    let url = event.path[0].src;
    image.setAttribute('src', url);
    modal.style.display = 'block' ;
    let opac = 0;
    modal.style.opacity = opac;
    let interval = setInterval(function(){
      opac = opac + 0.1;
      modal.style.opacity = opac;
      if(opac >= 1){
        clearInterval(interval);
      }
    },50);
  };

}]);
