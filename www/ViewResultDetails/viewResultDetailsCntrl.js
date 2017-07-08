(function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("viewResultDetailsCntrl", function ($scope, $http,$state, $localStorage){
      if($localStorage.username == ''|| $localStorage.username == null){
        $state.go('login');
      }
            $scope.viewDetails=function(){
                // console.log($localStorage.schedule_exam_id);
                // console.log($localStorage.username);
            /*my code start*/
             $http.post("http://enclaveengg.com/projects/examportal/api/result_details.php", {'schedule_exam_id':$localStorage.schedule_exam_id, 'user_id':$localStorage.username})
              .success(function(data, status, headers, config){
                //   console.log(data);
                  $scope.data = data;
                })
                  .error(function(data, status, headers, config){
                    $scope.errorMsg = 'Unable to fetch, please try again';
                  })
            }
       /*my code ends*/
    });
})();
