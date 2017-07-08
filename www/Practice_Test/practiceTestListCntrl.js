 (function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("practiceTestListCntrl", function ($scope, $http, $state, $localStorage,$log) {
      if($localStorage.username == ''|| $localStorage.username == null){
        $state.go('login');
      }
        $localStorage.schedule_exam_id = '';
        $localStorage.exam_type = '';
//------------------------------------practiceTestList-----------------------------------------------------//
            $scope.practiceTestList=function(){
                // console.log($localStorage.username);
             $http.post("http://enclaveengg.com/projects/examportal/api/select_practice_test.php",{'user_id':$localStorage.username})
              .success(function(data, status, headers, config){
                console.log(data);
                   $scope.exam=data.exam;
                /* console.log($scope.student);
                 console.log($scope.student[0].student_id);
               */   })
                  .error(function(data, status, headers, config){
                    $scope.errorMsg = 'Unable to fetch, please try again';
                  })
            }
//------------------------------------ /practiceTestList-----------------------------------------------------//

//------------------------------------selectPracticeTest-----------------------------------------------------//
       $scope.selectPracticeTest=function(){
          if(document.getElementById('testName').value != ''){
            $localStorage.schedule_exam_id = document.getElementById('testName').value;
            $localStorage.exam_type = 'p';
            $state.go("examInstruction");
          }
          else{
            alert(" Please select exam");
          }

        }
//------------------------------------ /selectPracticeTest-----------------------------------------------------//

    });
})();
