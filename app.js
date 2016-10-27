
angular.module('myApp', ['angularUtils.directives.dirPagination']).controller('mainController', function($scope, $http){
  
  $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia','Florida',
                  'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
                  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
                  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
       
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };

    $http({
      method: 'GET',
      url: 'logic.php',
    }).then(function (response) {
        $scope.party_house = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
        $scope.party_senate = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
        $scope.house = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        $scope.senate = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        $scope.legs = response.data.results;
    }, function (response) {
        // code to execute in case of error
    });
  // }
});


