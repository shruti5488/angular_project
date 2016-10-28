
angular.module('myApp', ['angularUtils.directives.dirPagination']).controller('mainController', function($scope, $http){
    
  $scope.Math = Math;
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
      debugger;
        var json_leg = JSON.parse(response.data[0]);
        var json_bill = JSON.parse(response.data[1]);
        var json_com = JSON.parse(response.data[2]);
        console.log(response);
        $scope.party_house = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
        $scope.party_senate = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
        $scope.house = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        $scope.senate = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        $scope.legs = json_leg.results;
        $scope.bills = json_bill.results;
        $scope.comms = json_com.results;
    }, function (response) {
        // code to execute in case of error
    });

    $scope.view_legislator = function(legislator_details, bill_details, committee_details){      
      $scope.detail = legislator_details;
      console.log(legislator_details);
      console.log(bill_details);
      var bill = [];
      var i, j = 0;
      debugger;
      // for(i=0; i<bill_details.length ; i++) {
      //   console.log(bill_details[i].sponsor_id);
      //     console.log(legislator_details.bioguide_id);
      //   if (bill_details[i].sponsor_id == "B000711"){
      //     bill[j][bill_id] = bill_details[i].sponsor_id;
      //     bill[j][title] = bill_details[i].official_title;
      //     bill[j][chamber] = bill_details[i].chamber;
      //     bill[j][bill_type] = bill_details[i].bill_type;
      //     bill[j][congress] = bill_details[i].congress;
      //     bill[j][link] = bill_details[i].last_version.urls.pdf;
      //     j++;
      //   }
      //   if (j==5) { }
      // }
    //   var i = "x";
    //   $http({
    //   method: 'GET',
    //   url: 'logic.php',
    //   data: {
    //       data: i
    //   }
    // }).then(function (response) {
    //   debugger;
    //   console.log(response);
    // }, function (response) {
    //   debugger;
    //     // code to execute in case of error
    // });
    var your_var = "x";
    $http.post(logic.php, {your_var_key: your_var}).
        success(function(data) {
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });;
     debugger;
      $scope.photo = "https://theunitedstates.io/images/congress/original/" + legislator_details.bioguide_id + ".jpg";
      $scope.twitter = "https://twitter.com/" + legislator_details.twitter ;
      $scope.facebook = "https://www.facebook.com/" + legislator_details.facebook_id;
      $scope.website = legislator_details.website;
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var today = new Date(2015,01,06);
      var start_date = new Date(legislator_details.term_start);
      var end_date = new Date(legislator_details.term_end);
      var now_start = Math.round(Math.abs((today.getTime() - start_date.getTime())/(oneDay)));
      var end_start = Math.round(Math.abs((end_date.getTime() - start_date.getTime())/(oneDay)));
      var term = Math.round((now_start/end_start)*100);
      
      if (legislator_details.party == "R"){
        $scope.party_name = "Representative";
        $scope.party_image = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
      }
      else if (legislator_details.party == "D"){
        $scope.party_name = "Democrat";
        $scope.party_image = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
      }
      else {
        $scope.party_name = "Independent";
        $scope.party_image = "http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
      }


  };
  
  // }
});


