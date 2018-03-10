app.controller('homeController',['$scope','$rootScope','requester','$controller',function($scope,$rootScope, requester,$controller){
  let btn = document.querySelector('.submit-form');
  console.log($controller('searchController',{$scope: $scope}));
  btn.addEventListener('click', function(){
    let photos = requester.searchPhotos($scope.query);
    photos.then(function(data){
      $scope.urlList = data;
    })
    .then(function(){
      //console.log(searchController);
    });
  });
}]);
