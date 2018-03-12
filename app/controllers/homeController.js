/**
 * Home view controller
 */
app.controller('homeController',['$scope','requester','$location','$rootScope',function($scope,requester,$location,$rootScope){
  const btn = document.querySelector('.submit-form');

  /**
   * btn listener - aftter btn clicking send data to service and change view
   */
  btn.addEventListener('click', function(){
    let photos = requester.searchPhotos($scope.query);
    photos.then(function(data){
      $rootScope.photosList = data;
    })
    .then(function(){
      $location.path('/finded');
    });
  });
}]);
