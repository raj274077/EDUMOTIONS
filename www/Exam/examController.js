(function () {
    'use strict'
    //code goes here.
      angular.module("app").controller("examController", function ($scope, $http, $state,$ionicPlatform,$localStorage, $log, $interval) {
            if($localStorage.backkaydeto == '0'){
              $state.go('dashboard');
            }
        $localStorage.exam_name = '';
        $localStorage.q_count = '';
        $localStorage.attempt_count = '';
        $localStorage.unAnswerQ = '';
        $localStorage.exam = '';
        $localStorage.ans = '';

        $scope.ans = {};
        $scope.ref_ans = {};
        $scope.ref_marks = {};
        $scope.answer = {}; //for selection only
        $scope.q_count = 0;
        $scope.attempt_count = 0;
        $scope.data = null;
        $scope.x = 0;
        $scope.remaining_time = null;
        // $localStorage.asdf = "asdf";
        // console.log($localStorage.asdf);

        $http.post("http://enclaveengg.com/projects/examportal/api/exam.php",{'schedule_exam_id':$localStorage.schedule_exam_id, 'exam_type':$localStorage.exam_type})
         .success(function(data){
            //  $scope.backkaydeto = '1';
             $scope.exam = data;
             $scope.q_count = data.q_count;
             for(var i=0; i< $scope.q_count; i++){
                 $scope.a = $scope.exam.questions[i].question_id;
                 $scope.ans[$scope.a]='no_answer';
             }
              $scope.timer = $scope.hours = $scope.minutes = $scope.seconds = data.time*60;
              $interval(function(){
              $scope.hours = parseInt(($scope.timer / 3600) % 24, 10);
              $scope.minutes = parseInt(($scope.timer / 60) % 60, 10);
              $scope.seconds = parseInt($scope.timer % 60, 10);

              $scope.hours = $scope.hours < 10 ? "0" + $scope.hours : $scope.hours;
              $scope.minutes = $scope.minutes < 10 ? "0" + $scope.minutes : $scope.minutes;
              $scope.seconds = $scope.seconds < 10 ? "0" + $scope.seconds : $scope.seconds;

              $scope.remaining_time = $scope.hours + ":" + $scope.minutes + ":" + $scope.seconds;
            //   --$scope.timer;
              if (--$scope.timer <= 0){
                $scope.finish_exam();
              }
            },1000,$scope.timer);
         })

         .error(function(data){
             alert("something went wrong");
         });

        $scope.nextQuestion = function(){
          if($scope.x <= $scope.q_count){
            ++$scope.x;
            $scope.exam.questions = $scope.exam.questions;
          }
        };
         $scope.backQuestion = function(){
             if($scope.x >0){
               --$scope.x;
               $scope.exam.questions = $scope.exam.questions;
             }
        };

// -------------------------------- Question Attempted----------------------------------------------//
        $scope.q_attempted = function(q_id, option_value){
          if($scope.ans[q_id] == 'no_answer'){
            $scope.attempt_count++;
          }
          $scope.ans[q_id] = option_value;
        //   console.log($scope.ans);
        }
// -------------------------------- Question Attempted-----------------------------------------------//

//----------------------------------------Finish Exam------------------------------------------------//
    $scope.finish_exam = function(){
      $scope.unAnswerQ = $scope.q_count - $scope.attempt_count;
      $localStorage.exam_name = $scope.exam.exam_name;
      $localStorage.q_count = $scope.q_count;
      $localStorage.attempt_count = $scope.attempt_count;
      $localStorage.unAnswerQ = $scope.unAnswerQ;
      $localStorage.exam = $scope.exam;
      $localStorage.ans = $scope.ans;
      // console.log($localStorage.exam);
      // console.log($localStorage.ans);
      // console.log("reffer above array");
      $state.go("exam_details");
    };
//----------------------------------------/Finish Exam------------------------------------------------//
    });
})();
