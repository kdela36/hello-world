var controller = angular.module('ApiHSController', []);

controller.controller('ApiHSController', ['$http', '$scope', function ($http, $scope) {
    $scope.CardData = [];



    $scope.buscarCarta = function () {

        nombreCarta = $scope.nombreCarta;
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + nombreCarta + "?mashape-key=KCQ7bahffymshOEHUHOUDpCqVpyzp1sdmHFjsns6hEZz0pxCwv").success(function (data) {
            console.log(data);
            $scope.CardData = data[0];
        })
    }

    $scope.buscarCartasPorClase = function () {
        console.log("entro a la func");
        clase = $scope.nombreClase;
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + clase + "?mashape-key=KCQ7bahffymshOEHUHOUDpCqVpyzp1sdmHFjsns6hEZz0pxCwv").success(function (data) {
            
            
            //data.splice(0,20);
            for(i in data){
                if(data[i].type != "Spell"){
                    console.log(i);
                    data.splice(i,1);
                } 
            }
            $scope.CardData = data;
            console.log($scope.CardData);

        })

    }

}]);
