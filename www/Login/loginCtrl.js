(function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("loginCtrl", function ($scope, $http, $state,$ionicPlatform,$localStorage,$log){
        /*my code starts*/
            localStorage.clear();
            $scope.insertdata=function(){
              $scope.errorMsg = '';
                  // alert($scope.user);
             /*my code start*/
             $http.post("http://enclaveengg.com/projects/examportal/api/login.php",{'username':$scope.user, 'password':$scope.pswd})
              .success(function(data, status, headers, config){
                    // console.log(data);
                    if(data == 'Please enter all fileds'){
                        alert('Please enter all fileds');
                    }
                    else if(data.user_id != '0'){
                       console.log(data);
                       $scope.username=data.user_id;
                       $localStorage.username = $scope.username;
                       $localStorage.name = data.name;
                      //  console.log($localStorage.username);
                    //    $localStorage.academic_year=$scope.academic_year;
                       $state.go("dashboard");
                    } else {
                        $scope.errorMsg = "Incorrect username or password";
                        console.log($scope.errorMsg);
                    }
                  })
                  .error(function(data, status, headers, config) {
                    $scope.errorMsg = 'Unable to fetch, please try again';
                  })
            }
       /*my code ends*/
    });
})();
