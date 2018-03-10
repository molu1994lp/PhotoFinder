app.service('requester',['$http', function($http){
  const service = this;
  const url = 'https://api.flickr.com/services/rest/?';
  const key = 'd053e56f2cd523a2e549bf9648565622';

  service.searchPhotos = function(query){
    const method = 'flickr.photos.search';
    let fullUrl = `${url}method=${method}&api_key=${key}&text=${query}&format=json&nojsoncallback=1`;
    let photosUrls;
    return $http({
      method: 'GET',
      url: fullUrl
    })
    .then(function(response){
      let dataSet = response.data.photos.photo;
      return dataSet.map(service.getPhotoUrl);
    })
    .catch(function(error){
      console.log(error);
    });
  };

  service.getPhotoUrl = function(element){
    return {url: `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`};
  };

/*  service.getExif = function(element){
    const method = "flickr.photos.getExif";
    let fullUrl = `${url}method=${method}&api_key=${key}&photo_id=${element.id}&format=json&nojsoncallback=1`;
    $http({
      method: 'GET',
      url: fullUrl
    })
    .then(function(response){
      if( response.data.photo === undefined){
        return "You have not permission to see exif data";
      }
      else{
        return response.data.photo.exif;
      }
    })
    .catch(function(error){
      console.log(error);
    });
  };*/
}]);
