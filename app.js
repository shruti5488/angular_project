// console.log("Shruti is pro");
// $(document).ready(function(){
//  debugger;
//  $("#menu-toggle").click(function(e) {
//         e.preventDefault();
//         $("#sidebar").toggleClass("active");
//  });
// }
$('.carousel [data-custom-slide-to]').click(function () {
debugger;     
    var buttonText = $(this).html();
    var $carousel = $($(this).attr('href'));
    var newIndex = $(this).data('custom-slide-to');
    var slide = $carousel.find(".item")[newIndex];
    
    // update the panel
    $("h4", slide).html("From - " + buttonText);
    
    //move the carousel
    $carousel.carousel(newIndex);      
});

var app = angular.module('myApp', [])
.controller('mainController', function($scope, $http){
  $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia','Florida',
'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota',
'Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  // $scope.ViewLeg = function() { 
       
    $http({
      method: 'GET',
      url: 'logic.php',
    }).then(function (response) {
      $scope.house = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
      $scope.senate = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
      $scope.legs = response.data.results;
    }, function (response) {
      // code to execute in case of error
    })
  // }
});


