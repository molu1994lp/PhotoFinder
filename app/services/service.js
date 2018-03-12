app.service('requester',['$http', function($http){
  const service = this;
  const url = 'https://api.flickr.com/services/rest/?';
  const key = 'd053e56f2cd523a2e549bf9648565622';

  /**
   * service.searchPhotos - Method to searching photos in flickr database
   *
   * @param  {String} query  - text from users input
   * @return {$http}         - asynchronous JS GET method
   */
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
      let url = dataSet.map(service.getPhotoDate);
      return url;
    })
    .catch(function(error){
      $location.path("/error");
    });
  };

  /**
   * service.getPhotoDate - method for getting url and id of photo from  searchPhoto response
   *
   * @param  {Object} element - is response object
   * @return {Object}         - object which contains two values: url and id of photo
   */
  service.getPhotoDate = function(element){
    let elementId = element.id;
    return {
      url: `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`,
      id: elementId
    };
  };

  /**
   * service.getExif -  method for getting exif info
   *
   * @param  {String} elementID - id of photo
   * @return {type}           -   asynchronous JS GET method
   */
  service.getExif = function(elementID){
    const method = "flickr.photos.getExif";
    let fullUrl = `${url}method=${method}&api_key=${key}&photo_id=${elementID}&format=json&nojsoncallback=1`;
    return $http({
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
      $location.path("/error");
    });
  };
}]);
