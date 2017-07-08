(function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("userProfileCntrl", function ($scope, $http,$state,$localStorage){
      if($localStorage.username == ''|| $localStorage.username == null){
        $state.go('login');
      }
        $scope.student={};
        $scope.refresh = function(){
            location.reload();
        };
        $scope.insertdata=function(){
            // alert($localStorage.username );
            /*my code start*/
            // $http.get("http://enclaveengg.com/projects/examportal/api/profile.php")
            $http.post("http://enclaveengg.com/projects/examportal/api/profile.php",{'username':$localStorage.username, 'academic_year':$localStorage.academic_year})
            .success(function(data, status, headers, config){
              console.log(data);
               $scope.student=data.student;
            })
            .error(function(data, status, headers, config) {
            $scope.errorMsg = 'Unable to fetch, please try again';
            })
        }
       /*my code ends*/
    });
})();
