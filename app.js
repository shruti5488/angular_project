
var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('mainController', function($scope, $http){

      $scope.legislator_show = true;
      $scope.bill_show = false;
      $scope.committee_show = false;
      $scope.bill_hide = true;
      $scope.committee_hide = true; 
      $scope.fav_hide = true;
      $scope.fav_show = false;

  $scope.view_leg = function () {
    $scope.legislator_show = true;
    $scope.bill_show = false;
    $scope.committee_show = false;
    $scope.fav_show = false;
}

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
        var json_leg_house = JSON.parse(response.data[1]);
        var json_leg_senate = JSON.parse(response.data[2]);
        var json_bill_dis = JSON.parse(response.data[3]);
        var json_com_house = JSON.parse(response.data[4]);
        var json_com_senate = JSON.parse(response.data[5]);
        var json_com_joint = JSON.parse(response.data[6]);
        $scope.party_house = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
        $scope.party_senate = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
        $scope.house = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        $scope.senate = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        $scope.bills_display = json_bill_dis.results;
        $scope.legs = json_leg.results;
        $scope.legs_house = json_leg_house.results;
        $scope.legs_senate = json_leg_senate.results;
        $scope.comms_house = json_com_house.results;
        $scope.comms_house_len = json_com_house.count;
        $scope.comms_senate = json_com_senate.results;
        $scope.comms_senate_len = json_com_senate.count;
        $scope.comms_joint = json_com_joint.results;
    }, function (response) {
      
    });
    $scope.view_bill = function () {

      $scope.legislator_show = false;
      $scope.bill_show = true;
      $scope.committee_show = false;
      $scope.fav_show = false;
      debugger;
      var active_bills = [];
      var new_bills = [];
      var j = 0;
      var k = 0;
      for(i=0; i<$scope.bills_display.length ; i++){
        if ($scope.bills_display[i].history.active == false) {
          new_bills[j] = $scope.bills_display[i];
          j++;
        }
        else{
          active_bills[k] = $scope.bills_display[i];
          k++;
        }
      }
      $scope.new_bills = new_bills;
      $scope.active_bills = active_bills;
    }

    $scope.view_comm = function () {
      $scope.legislator_show = false;
      $scope.bill_show = false;
      $scope.committee_show = true;
      $scope.fav_show = false;
      
    }
    $scope.legislator_favbar = [];
    $scope.toggle_leg = function (index, leg_fav) {
      
      var new_flag, pic_url; 
      new_flag = "true";
      if ($scope.legislator_favbar.length == 0)
      {
        new_flag = "true";
        
      }
      else{
        for (i=0; i<$scope.legislator_favbar.length; i++){
          if (leg_fav.bioguide_id == $scope.legislator_favbar[i].key)
          {
            new_flag = "false";
          }
          else if(leg_fav.key == $scope.legislator_favbar[i].key) {
            new_flag = "false";
          }
        }
      }
      if (new_flag == "true")
      {
        // $scope.legislator_favbar.push(flag + ':' + new_flag  , key + ':'+ leg_fav.committee_id ,value + ': ' + leg_fav);
        pic_url = "https://theunitedstates.io/images/congress/original/" + leg_fav.bioguide_id + ".jpg";
        if (leg_fav.party=="R"){
          party_symb = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
        }
        else if (leg_fav.party == "D"){
         party_symb = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
        }
        else if (leg_fav.party == "I"){
          party_symb = "http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
        }
        if (leg_fav.chamber="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
           chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        $scope.legislator_favbar.push({flag:new_flag,key:leg_fav.bioguide_id,value:leg_fav,pic:pic_url,party:party_symb,chamber:chamber_pic});
      } 
      else {
        $scope.legislator_favbar.splice(index, 1);        
      }
    }
    $scope.bill_favbar = [];
    $scope.toggle_bill = function (index, bill_fav) {
      
      var new_flag, pic_url;
      new_flag = "true"; 
      debugger;
      if ($scope.bill_favbar.length == 0)
      {
        new_flag = "true";
        
      }
      else{
        for (i=0; i<$scope.bill_favbar.length; i++){
          if (bill_fav.bill_id == $scope.bill_favbar[i].key)
          {
            new_flag = "false";
          }
          else if(bill_fav.key == $scope.bill_favbar[i].key) {
            new_flag = "false";
          }
        }
      }
      if (new_flag == "true")
      {
        if (bill_fav.chamber=="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
           chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        $scope.bill_favbar.push({flag:new_flag,key:bill_fav.bill_id,value:bill_fav,chamber:chamber_pic});
      } 
      else {
        $scope.bill_favbar.splice(index, 1);        
      }
    }
    $scope.committee_favbar = [];
    $scope.toggle_comm = function (index, comm_fav) {  
      var new_flag, pic_url; 
      new_flag = "true";
      debugger;
      if ($scope.committee_favbar.length == 0)
      {
        new_flag = "true";
        
      }
      else{
        for (i=0; i<$scope.committee_favbar.length; i++){
          if (comm_fav.bioguide_id == $scope.committee_favbar[i].key)
          {
            new_flag = "false";
          }
          else if(comm_fav.key == $scope.committee_favbar[i].key) {
            new_flag = "false";
          }
        }
      }
      if (new_flag == "true")
      {
        if (comm_fav.chamber=="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
           chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        $scope.committee_favbar.push({flag:new_flag,key:comm_fav.committee_id,value:comm_fav,chamber:chamber_pic});
      } 
      else {
        $scope.committee_favbar.splice(index, 1);        
      }
    }
    $scope.viewdetail_bill = function(bill_detail){      
      $scope.bill_detail = bill_detail;
     
     }

    $scope.view_fav = function(bill_detail){  
      
     console.log($scope.legislator_favbar);
      $scope.fav_show = true;
      $scope.legislator_show = false;
      $scope.bill_show = false;
      $scope.committee_show = false;
     }


    $scope.view_legislator = function(legislator_details){      
      $scope.detail = legislator_details;
      
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
        // console.log(response);
        var json_leg_comm = JSON.parse(response.data[0]);
        var json_leg_bill = JSON.parse(response.data[1]);
        var leg_bill = [];
        var leg_comm = [];
        var i, j = 0;
        if (json_leg_comm.count > 0){
          for(i=0; i<json_leg_comm.count ; i++) {
            if(j<5) {
              leg_comm[i] = json_leg_comm.results[i];
              j++;
            }
          }
        } else {
          leg_comm[0] = "N.A";
        }

        j = 0;
        if (json_leg_bill.count > 0){
          for(i=0; i<json_leg_bill.count ; i++) {
            if(j<5) {
              leg_bill[i] = json_leg_bill.results[i];
              j++;
            }
          }
        } else {
          leg_bill[0] = "N.A";
        }
        $scope.leg_comms = leg_comm;
        $scope.leg_bills = leg_bill;
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
      $scope.item = {
        star: false
      };
});

  app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  });



