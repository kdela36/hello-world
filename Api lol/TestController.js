var controller = angular.module('TestController', []);
//console.log("laconchadetumadre");

controller.controller('TestController', ['$http', '$scope', function ($http, $scope) {
    
    
$scope.cargarMapa = function () {
    
}
var mapOptions = {
      center:new google.maps.LatLng(-34.5816256,-58.5068148), 
      zoom:15, 
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      
   };
   
var map = new google.maps.Map(document.getElementById("sample"),mapOptions);
    $scope.asd = function(){
    console.log(map);
        
    }
}]);

/*287598*/