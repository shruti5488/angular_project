
angular.module('myApp', ['angularUtils.directives.dirPagination']).controller('mainController', function($scope, $http){
    
  $scope.Math = Math;
  $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia','Florida',
                  'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
                  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
                  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
       
  $scope.currentPage = 1;
  $scope.pageSize = 10;

    $http({
      method: 'GET',
      url: 'logic.php',
    }).then(function (response) {
        var json_leg = JSON.parse(response.data[0]);
        var json_bill = JSON.parse(response.data[1]);
        var json_com = JSON.parse(response.data[2]);
        console.log(response);
        debugger;
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

      var str = "string";
      var bioguide_id = legislator_details.bioguide_id;
      $http({
      method: 'POST',
      url: 'logic.php',
      data: {
        data: str,
        bioguide_id : bioguide_id
      }
    }).then(function (response) {
        console.log(response);
        var json_leg_comm = JSON.parse(response.data[0]);
        var json_leg_bill = JSON.parse(response.data[1]);
        var bill = [];
        var comm = [];
        var i, j = 0;
        if (json_leg_comm.count > 0){
          for(i=0; i<json_leg_comm.count ; i++) {
            if(j<5) {
              comm[i] = json_leg_comm.results[i];
              j++;
            }
          }
        } else {
          comm[0] = "N.A";
        }

        j = 0;
        if (json_leg_bill.count > 0){
          for(i=0; i<json_leg_bill.count ; i++) {
            if(j<5) {
              bill[i] = json_leg_bill.results[i];
              j++;
            }
          }
        } else {
          bill[0] = "N.A";
        }
        $scope.comms = comm;
        $scope.bills = bill;
    }, function (response) {
        // code to execute in case of error
    });
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


