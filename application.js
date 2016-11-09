
var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

app.controller('mainController', function($scope, $http){

    $scope.autofav = true;
    $scope.legislator_show = true;
    $scope.bill_show = false;
    $scope.committee_show = false;
    $scope.bill_hide = true;
    $scope.committee_hide = true; 
    $scope.fav_hide = true;
    $scope.fav_show = false;

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
      var json_bill_dis = JSON.parse(response.data[1]);
      $scope.party_house = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
      $scope.party_senate = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
      $scope.house = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
      $scope.senate = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
      $scope.bills_display = json_bill_dis.results;
      $scope.legs = json_leg.results;
      $scope.view_leg(); 
    }, function (response) {
    });

    $scope.view_leg = function () {
      debugger;
      $scope.legislator_show = true;
      $scope.bill_show = false;
      $scope.committee_show = false;
      $scope.fav_show = false;
      
      var house = [];
      var senate = [];
      var j = 0;
      var k = 0;
      for(var i=0; i<$scope.legs.length; i++) {
        if($scope.legs[i].chamber === "house") {
          house[j] = $scope.legs[i];
          j++;
        }
        else if($scope.legs[i].chamber === "senate"){
          senate[k] = $scope.legs[i];
          k++;
        }
      } 
      $scope.legs_house = house;
      $scope.legs_senate = senate;
      var flag = false;
      var fav_legislator = [];
      fav_legislator = JSON.parse(localStorage.getItem('legislator_storage'));
      if (fav_legislator.length !== 0) {
        for(var i=0; i<$scope.legs.length; i++) {
          flag = false;
          for(var k=0; k<fav_legislator.length; k++) {
            if(fav_legislator[k].bioguide_id === $scope.legs[i].bioguide_id) {
              $scope.legs[i].fav = true;
              flag = true;
            }
            else if (flag !== true) {
               $scope.legs[i].fav = false;
            }
          }
        }
        for(var i=0; i<$scope.legs_house.length; i++) {
          flag = false;
          for(var k=0; k<fav_legislator.length; k++) {
            if(fav_legislator[k].bioguide_id === $scope.legs_house[i].bioguide_id) {
              $scope.legs_house[i].fav = true;
              flag = true;
            }
            else if (flag !== true) {
              $scope.legs_house[i].fav = false;
            }
          }
        }
        for(var i=0; i<$scope.legs_senate.length; i++) {
          flag = false;
          for(var k=0; k<fav_legislator.length; k++) {
            if(fav_legislator[k].bioguide_id === $scope.legs_senate[i].bioguide_id) {
              $scope.legs_senate[i].fav = true;
              flag = true;
            }
            else if (flag !== true) {
               $scope.legs_senate[i].fav = false;
            }
          }
        }
      }
      else {
        for(var i=0; i<$scope.legs.length; i++) {
          $scope.legs[i].fav = false; 
        }
        for(var i=0; i<$scope.legs_house.length; i++) {
          $scope.legs_house[i].fav = false; 
        }
        for(var i=0; i<$scope.legs_senate.length; i++) {
          $scope.legs_senate[i].fav = false; 
        }
      }
    }
    $scope.legislator_favbar = [];
    $scope.toggle_leg = function (index, leg_fav) {
      var flag = true;
      var pic_url, chamber_pic; 
      leg_fav.fav = true;
      var fav_legislator = [];
      fav_legislator = JSON.parse(localStorage.getItem('legislator_storage')); 
      if (fav_legislator !== null) {
        for(var k=0; k<fav_legislator.length; k++) {
          if (fav_legislator[k].bioguide_id === leg_fav.bioguide_id) {
            flag = false;
          }
        }
      }
      if (flag === true)
      {
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
        if (leg_fav.chamber=="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
           chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        leg_fav.pic_url = pic_url;
        leg_fav.party_symb = party_symb;
        leg_fav.chamber_pic = chamber_pic;
        $scope.legislator_favbar.push(leg_fav);
        localStorage.setItem("legislator_storage", JSON.stringify($scope.legislator_favbar));
      }
    } 
    
    $scope.delete_leg = function (index, legis_fav) {
      $scope.legislator_favbar.splice(index, 1);     
      localStorage.setItem("legislator_storage", JSON.stringify($scope.legislator_favbar));   
    }
    
    $scope.view_bill = function () {
      $scope.legislator_show = false;
      $scope.bill_show = true;
      $scope.committee_show = false;
      $scope.fav_show =  false;     
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
      $scope.active_bills = active        
      var flag = false;
      var fav_bill = [];
      fav_bill = JSON.parse(localStorage.getItem('bill_storage'));
      if (fav_bill !== null) {
        if (fav_bill.length === 0) {
          for(var i=0; i<$scope.active_bills.length; i++) {
             $scope.active_bills[i].fav = false; 
          }
          for(var i=0; i<$scope.new_bills.length; i++) {
             $scope.new_bills[i].fav = false; 
          }
        }
        else {
          for(var i=0; i<$scope.active_bills.length; i++) {
            flag = false;
            for(var k=0; k<fav_bill.length; k++) {
              if(fav_bill[k].bill_id === $scope.active_bills[i].bill_id) {
                $scope.active_bills[i].fav = true;
                flag = true;
              }
              else if (flag !== true) {
                 $scope.active_bills[i].fav = false;
              }
            }
          }
          for(var i=0; i<$scope.new_bills.length; i++) {
            flag = false;
            for(var k=0; k<fav_bill.length; k++) {
              if(fav_bill[k].bill_id === $scope.new_bills[i].bill_id) {
                $scope.new_bills[i].fav = true;
                flag = true;
              }
              else if (flag !== true) {
                 $scope.new_bills[i].fav = false;
              }
            }
          }
        }
      }
      else {
        for(var i=0; i<$scope.active_bills.length; i++) {
          $scope.active_bills[i].fav = false; 
        }
      }       
    }
    
    $scope.bill_favbar = [];
    $scope.toggle_bill = function (index, bill_fav) {
      var flag = true;
      var chamber_pic; 
      bill_fav.fav = true;
      var fav_bill = [];
      fav_bill = JSON.parse(localStorage.getItem('bill_storage'));
      if (fav_bill !== null) {
        for(var k=0; k<fav_bill.length; k++) {
          if (fav_bill[k].bill_id === bill_fav.bill_id) {
            flag = false;
          }
        }
      }
      if (flag === true)
      {
        if (bill_fav.chamber=="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
           chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        bill_fav.chamber_pic = chamber_pic;
        $scope.bill_favbar.push(bill_fav);
        localStorage.setItem("bill_storage", JSON.stringify($scope.bill_favbar));
      }
    }

    $scope.delete_bill = function (index, bill_fav) {
      $scope.bill_favbar.splice(index, 1);     
      localStorage.setItem("bill_storage", JSON.stringify($scope.bill_favbar));   
    }

    $scope.view_comm = function () {
      $scope.legislator_show = false;
      $scope.bill_show = false;
      $scope.committee_show = true;
      $scope.fav_show = false;
      var str_comm = "comm_string";
      $http({
        method: 'POST',
        url: 'logic.php',
        data: {
          data: str_comm,
      }
      }).then(function (response) {
        var json_com_house = JSON.parse(response.data[0]);
        var json_com_senate = JSON.parse(response.data[1]);
        var json_com_joint = JSON.parse(response.data[2]);
        $scope.comms_house = json_com_house.results;
        $scope.comms_house_len = json_com_house.count;
        $scope.comms_senate = json_com_senate.results;
        $scope.comms_senate_len = json_com_senate.count;
        $scope.comms_joint = json_com_joint.results;
      }, function (response) {
      });
      var flag = false;
      var fav_committee = [];
      fav_committee = JSON.parse(localStorage.getItem('committee_storage'));
      if (fav_committee.length !== 0) {
        for(var i=0; i<$scope.comms_house.length; i++) {
          flag = false;
          for(var k=0; k<fav_committee.length; k++) {
            if(fav_committee[k].committee_id === $scope.comms_house[i].committee_id) {
              $scope.comms_house[i].fav = true;
              flag = true;
            }
            else if (flag !== true) {
               $scope.comms_house[i].fav = false;
            }
          }
        }
      }
      else {
        for(var i=0; i<$scope.comms_house.length; i++) {
          $scope.comms_house[i].fav = false; 
        }
      }
    }
    
    $scope.committee_favbar = [];
    $scope.fav_star = [];
    $scope.toggle_comm = function (index, comm_house) { 
      var flag = true;
      var pic_url, chamber_pic; 
      comm_house.fav = true;
      console.log($scope.committee_favbar);
      var fav_committee = [];
      fav_committee = JSON.parse(localStorage.getItem('committee_storage'));
      for(var k=0; k<fav_committee.length; k++) {
        if (fav_committee[k].committee_id === comm_house.committee_id) {
          flag = false;
        }
      }
      if (flag === true)
      {       
        if (comm_house.chamber=="house"){
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
        } 
        else {
          chamber_pic = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
        }
        comm_house.chamber_pic = chamber_pic;
        $scope.committee_favbar.push(comm_house);
        localStorage.setItem("committee_storage", JSON.stringify($scope.committee_favbar));
      }
    }
     
    $scope.delete_comm = function (index, comm_fav) {
      $scope.committee_favbar.splice(index, 1);     
      localStorage.setItem("committee_storage", JSON.stringify($scope.committee_favbar));   
    }

    $scope.viewdetail_bill = function(bill_detail) {      
      $scope.bill_detail = bill_detail;
    }

    $scope.view_fav = function(bill_detail){  
      console.log($scope.legislator_favbar);
      $scope.fav_show = true;
      $scope.legislator_show = false;
      $scope.bill_show = false;
      $scope.committee_show = false;

      $scope.legislator_favbar = JSON.parse(localStorage.getItem('legislator_storage'));
      $scope.bill_favbar = JSON.parse(localStorage.getItem('bill_storage'));
      $scope.committee_favbar = JSON.parse(localStorage.getItem('committee_storage'));
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
    }
    
    $scope.item = {
      star: false
    };
});


app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});


// var body_message = "Hello!";
// var subject = 'Email';
// $('#email_leg').click(function() {
// email = $("#email_leg").val();
//     var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

//     win = window.open(mailto_link, 'emailWindow');
//     if (win && win.open && !win.closed) win.close();

// });
