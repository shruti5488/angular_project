// console.log("Shruti is pro");
// $(document).ready(function(){
//  debugger;
//  $("#menu-toggle").click(function(e) {
//         e.preventDefault();
//         $("#sidebar").toggleClass("active");
//  });
// }

var app = angular.module('myApp', [])
.controller('mainController', function($scope){
  debugger;
  $scope.legs = ["Milk", "Bread", "Cheese"];
  $scope.ViewLeg = function() { 
    debugger;     
    $http({
      method: 'GET',
      url: 'php.php'
    }).then(function (response) {
      // code to execute in case of success
    }, function (response) {
      // code to execute in case of error
    })
  }
});


