(function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("viewResultCntrl", function ($scope, $http, $state, $localStorage,$log) {
      if($localStorage.username == ''|| $localStorage.username == null){
        $state.go('login');
      }
        //user_id
        $scope.student_marks={};
        $scope.no_record = true;
            $scope.viewResult=function(){
            /*my code start*/
            console.log($localStorage.username);
             $http.post("http://enclaveengg.com/projects/examportal/api/result.php",{'user_id':$localStorage.username})
              .success(function(data, status, headers, config) {
                $scope.no_record = data.student_marks.length;
                $scope.student_marks=data.student_marks;
             })
                  .error(function(data, status, headers, config) {
                    $scope.errorMsg = 'Unable to fetch, please try again';
                    alert($scope.errorMsg);
                    console.log($scope.errorMsg);
                  })
            }
    //------------------------------------------------result_details-----------------------------------------//
           $scope.result_details = function(){
               $localStorage.schedule_exam_id = document.getElementById('details_id').value;
           }
      //------------------------------------------------/result_details-----------------------------------------//
       /*my code ends*/
    });
})();
