
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

    $scope.legislator_favbar = [];
    $scope.bill_favbar = [];
    $scope.committee_favbar = [];

    $scope.Math = Math;
    $scope.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida',
                    'Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                    'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
                    'North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota',
                    'Tennessee','Texas','US Virgin Islands','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
      $scope.reset_state = function(){
        if($scope.boxmodel==null) {
          delete $scope.boxmodel;
        }
      } 


    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $http({
      method: 'GET',
      url: 'index.php',
      params: { operation: "legislators_bill_committee"} 
    }).then(function (response) {
      var json_leg = JSON.parse(response.data[0]);
      var json_bill_dis_active = JSON.parse(response.data[1]);
      var json_bill_dis_new = JSON.parse(response.data[2]);
      var json_com_house = JSON.parse(response.data[3]);
      var json_com_senate = JSON.parse(response.data[4]);
      var json_com_joint = JSON.parse(response.data[5]);
      
      $scope.house = "h.png";
      $scope.senate = "s.svg";
      $scope.new_bills  = json_bill_dis_active.results;
      $scope.active_bills = json_bill_dis_new.results;
      $scope.legs = json_leg.results;
      $scope.comms_house = json_com_house.results;
      $scope.comms_senate = json_com_senate.results;
      $scope.comms_joint = json_com_joint.results;
      for(var i=0; i<$scope.legs.length; i++) {
        if ($scope.legs[i].district === null) {
          $scope.legs[i].district = "N.A";
        }
        else {
          district = $scope.legs[i].district;
          $scope.legs[i].district = "District " + district;
        }
      }
      for(var j=0; j<$scope.active_bills.length; j++) {
        $scope.active_bills[j].status = "Active";
      }
      for(var k=0; k<$scope.new_bills.length; k++) {
        $scope.new_bills[k].status = "New";
      }
      $scope.view_leg(); 
    }, function (response) {
    });

    $scope.view_leg = function () {
      $scope.legislator_show = true;
      $scope.bill_show = false;
      $scope.committee_show = false;
      $scope.fav_show = false;
      var house = [];
      var senate = [];
      var j = 0;
      var k = 0;
      var district;
      for(var i=0; i<$scope.legs.length; i++) {
        if ($scope.legs[i].party === "R"){
          $scope.legs[i].party_image = "r.png";
        }
        else if ($scope.legs[i].party === "D"){
          $scope.legs[i].party_image = "d.png";
        }
        else {
          $scope.legs[i].party_image = "http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
        }
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
      if (fav_legislator !== null) {
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
    }
    
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
            $scope.legislator_favbar.splice(index, 1);     
            localStorage.setItem("legislator_storage", JSON.stringify($scope.legislator_favbar));  
            leg_fav.fav = false;
          }
        }
      }
      if (flag === true)
      {
        pic_url = "https://theunitedstates.io/images/congress/original/" + leg_fav.bioguide_id + ".jpg";
        if (leg_fav.party=="R"){
          party_symb = "r.png";
        }
        else if (leg_fav.party == "D"){
         party_symb = "d.png";
        }
        else if (leg_fav.party == "I"){
          party_symb = "http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
        }
        if (leg_fav.chamber=="house"){
          chamber_pic = "h.png";
        } 
        else {
           chamber_pic = "s.svg";
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
            $scope.bill_favbar.splice(index, 1);     
            localStorage.setItem("bill_storage", JSON.stringify($scope.bill_favbar)); 
            bill_fav.fav = false;
          }
        }
      }
      if (flag === true)
      {
        if (bill_fav.chamber=="house"){
          chamber_pic = "h.png";
        } 
        else {
           chamber_pic = "s.svg";
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

      var flag = false;
      var fav_committee = [];
      fav_committee = JSON.parse(localStorage.getItem('committee_storage'));
      if (fav_committee !== null) {
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
            if ($scope.comms_house[i].office === null || $scope.comms_house[i].office === undefined) {
                $scope.comms_house[i].office = "N.A";
            }
          }
          for(var i=0; i<$scope.comms_senate.length; i++) {
            flag = false;
            for(var k=0; k<fav_committee.length; k++) {
              if(fav_committee[k].committee_id === $scope.comms_senate[i].committee_id) {
                $scope.comms_senate[i].fav = true;
                flag = true;
              }
              else if (flag !== true) {
                 $scope.comms_senate[i].fav = false;
              }
            }
          }
          for(var i=0; i<$scope.comms_joint.length; i++) {
            flag = false;
            for(var k=0; k<fav_committee.length; k++) {
              if(fav_committee[k].committee_id === $scope.comms_joint[i].committee_id) {
                $scope.comms_joint[i].fav = true;
                flag = true;
              }
              else if (flag !== true) {
                 $scope.comms_joint[i].fav = false;
              }
            }
          }
        }
        else {
          for(var i=0; i<$scope.comms_house.length; i++) {
            $scope.comms_house[i].fav = false; 
            if ($scope.comms_house[i].office === null || $scope.comms_house[i].office === undefined) {
                $scope.comms_house[i].office = "N.A";
            }
          }
          for(var i=0; i<$scope.comms_senate.length; i++) {
            $scope.comms_senate[i].fav = false; 
          }
          for(var i=0; i<$scope.comms_joint.length; i++) {
            $scope.comms_joint[i].fav = false; 
          }
        }
      }
    }
    
    
    $scope.fav_star = [];
    $scope.toggle_comm = function (index, comm_house) { 
      var flag = true;
      var pic_url, chamber_pic; 
      comm_house.fav = true;
      console.log($scope.committee_favbar);
      var fav_committee = [];
      fav_committee = JSON.parse(localStorage.getItem('committee_storage'));
      if (fav_committee !== null) {
        for(var k=0; k<fav_committee.length; k++) {
          if (fav_committee[k].committee_id === comm_house.committee_id) {
            flag = false;
            $scope.committee_favbar.splice(index, 1);     
            localStorage.setItem("committee_storage", JSON.stringify($scope.committee_favbar));
            comm_house.fav = false;
          }
        }
      }
      if (flag === true)
      {       
        if (comm_house.chamber=="house"){
          chamber_pic = "h.png";
        } 
        else {
          chamber_pic = "s.svg";
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
      $scope.item_bill_show = true;
      $scope.item_bill_hide = false;
      $scope.item_legislator = true;

      // if (bill_detail.last_version.urls.pdf === null ||  bill_detail.last_version.urls.pdf === undefined){
      //   $scope.bill_link_absent = true;
      //   $scope.bill_link_present = false;
      // }
      // else{
      //   $scope.bill_link_absent = false;
      //   $scope.bill_link_present = true;
      // }

      if (bill_detail.urls.congress === null ||  bill_detail.urls.congress === undefined){
        $scope.congress_url_absent = true;
        $scope.congress_url_present = false;
      }
      else{
        $scope.congress_url_absent = false;
        $scope.congress_url_present = true;
      }
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
    
    $scope.view_legislator = function(legislator_details) {   
      $scope.item_bill_show = false;
      $scope.item_bill_hide = true;
      $scope.item_legislator = false;   
      $scope.detail = legislator_details;
      var str = "string";
      var bioguide_id = legislator_details.bioguide_id;
      $http({
        method: 'POST',
        url: 'index.php',
          params: { 
            operation: "leg_viewdetail",
            bioguide : bioguide_id
          } 
      }).then(function (response) {
        var json_leg_comm = JSON.parse(response.data[0]);
        var json_leg_bill = JSON.parse(response.data[1]);
        $scope.leg_comms = json_leg_comm.results;
        $scope.leg_bills = json_leg_bill.results;
      }, function (response) {
        // code to execute in case of error
      });
      $scope.photo = "https://theunitedstates.io/images/congress/original/" + legislator_details.bioguide_id + ".jpg";
      
      if (legislator_details.fax === null || legislator_details.fax === undefined) {
        $scope.fax_empty = false;
        $scope.fax_full = true;
      } else {
        $scope.fax_empty = true;
        $scope.fax_full = false;
      }

      if (legislator_details.oc_email === null || legislator_details.oc_email === undefined) {
        $scope.email_empty = false;
        $scope.email_full = true;
      } else {
        $scope.email_empty = true;
        $scope.email_full = false;
      }

      if (legislator_details.twitter_id === undefined || legislator_details.twitter_id === null) {
        $scope.twitter_empty = false;
        $scope.twitter_full = true;

      } else {
         $scope.twitter = "https://twitter.com/" + legislator_details.twitter_id ;
        $scope.twitter_empty = true;
        $scope.twitter_full = false;
      }

      if (legislator_details.facebook_id === undefined || legislator_details.facebook_id === null) {
        $scope.facebook_empty = false;
        $scope.facebook_full = true;

      } else {
        $scope.facebook = "https://www.facebook.com/" + legislator_details.facebook_id;
        $scope.facebook_empty = true;
        $scope.facebook_full = false;
      }
     
      if (legislator_details.website === undefined || legislator_details.website === null) {
        $scope.website_empty = false;
        $scope.website_full = true;
      } else {
        $scope.website = legislator_details.website;
        $scope.website_empty = true;
        $scope.website_full = false;
      }
      
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      // var today = new Date(2015,01,06);
      var today = new Date();
      var start_date = new Date(legislator_details.term_start);
      var end_date = new Date(legislator_details.term_end);
      var now_start = Math.round(Math.abs((today.getTime() - start_date.getTime())/(oneDay)));
      var end_start = Math.round(Math.abs((end_date.getTime() - start_date.getTime())/(oneDay)));
      var term = Math.round((now_start/end_start)*100);
      $scope.term = term;
      $scope.term_style = {width: term + '%'};
      
      if (legislator_details.party == "R"){
        $scope.party_name = "Republican";
        $scope.party_image = "r.png";
      }
      else if (legislator_details.party == "D"){
        $scope.party_name = "Democrat";
        $scope.party_image = "d.png";
      }
      else {
        $scope.party_name = "Independent";
        $scope.party_image = "http://independentamericanparty.org/wp-content/themes/v/images/logo-american-heritage-academy.png";
      }
    }
    
    $scope.item = {
      star: false
    };

    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
    });
});


app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
