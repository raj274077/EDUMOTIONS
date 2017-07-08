(function (){
    'use strict'
    //code goes here.
    angular.module("app").controller("selectTestListCntrl", function ($scope, $http, $state, $localStorage,$log) {
      if($localStorage.username == ''|| $localStorage.username == null){
        $state.go('login');
      }
//-----------------------------------TestList-----------------------------------------------------//
            $scope.selectTestList=function(){
            $localStorage.schedule_exam_id = '';
            $localStorage.exam_type = '';
             $http.post("http://enclaveengg.com/projects/examportal/api/select_test.php",{'user_id':$localStorage.username})
              .success(function(data, status, headers, config) {
                // console.log(data);
                   $scope.exam=data.exam;
                /* console.log($scope.student);
                 console.log($scope.student[0].student_id);
               */   })
                  .error(function(data, status, headers, config) {
                    $scope.errorMsg = 'Unable to fetch, please try again';
                  })
            }
//------------------------------------ /TestList-----------------------------------------------------//

//------------------------------------selectTest-----------------------------------------------------//
       $scope.selectTest=function(){
         if(document.getElementById('testName').value != ''){
             $localStorage.schedule_exam_id = document.getElementById('testName').value;
             $localStorage.exam_type = 'm';
             $http.post("http://enclaveengg.com/projects/examportal/api/check_test_attempt.php",{'user_id':$localStorage.username, 'schedule_exam_id': $localStorage.schedule_exam_id})
             .success(function(data, status, headers){
                //  console.log(data);
                 $scope.status=data.status;
                 if( $scope.status == '1'){
                     alert("This exam already submitted");
                 }
                 else{
                  $state.go("examInstruction");
                 }
             })
             .error(function(data, status, headers, config) {
               $scope.errorMsg = 'Unable to fetch, please try again';
             })
            }
            else {
                alert('Please select exam');
            }
        }
//------------------------------------ /selectTest-----------------------------------------------------//

    });
})();
