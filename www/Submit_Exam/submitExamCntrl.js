(function(){
  'use strict'
  angular.module("app").controller("submitExamCntrl", function ($scope,$http,$ionicPlatform,$state,$localStorage,$log){
    // $ionicPlatform.registerBackButtonAction(function (event) {
    //   if($state.current.name=="menu.dashboard"){
    //     navigator.app.exitApp();
    //   }
    //   else {
    //     navigator.app.backHistory();
    //   }
    //   }, 100);
    if($localStorage.username == ''|| $localStorage.username == null){
      $state.go('login');
    }
      $localStorage.backkaydeto = '0';
      $scope.exam = $localStorage.exam;
      $scope.exam_name = $localStorage.exam_name;
      $scope.q_count = $localStorage.q_count;
      $scope.attempt_count = $localStorage.attempt_count;
      $scope.unAnswerQ = $localStorage.unAnswerQ;
      $scope.total_marks = $scope.exam.total_marks;
      $scope.ans = $localStorage.ans;
      $scope.marks_div = false;
      // $route.reload();
      // console.log($scope.ans);
      // console.log($scope.exam);
      $scope.obtained_marks = 0;
      if($localStorage.exam_type == 'm'){
        $scope.gotohome = true;
        $scope.marks_div = true;
        // alert("main exam");
        var submit_exam = new Object();
        submit_exam['schedule_exam_id'] = $localStorage.schedule_exam_id;
        submit_exam['student_id'] = $localStorage.username;
        // submit_exam['question_array'] = $scope.exam;
        submit_exam['answer_array'] = $scope.ans;
        submit_exam = JSON.stringify(submit_exam);
        // console.log(submit_exam);
        $http.post("http://enclaveengg.com/projects/examportal/api/submit_exam.php",submit_exam)
        .success(function(data){
          if(data == "success"){
            alert('Exam submitted successfully');
            $scope.gotohome = false;
          }
          else {
            alert("Error while submitting exam");
          }
        // console.log(data);
        })
        .error(function(data){
          alert('Error while submitting exam');
        });
      }
      else{
        for(var i=0; i<$scope.q_count; i++){
          $scope.a = $scope.exam.questions[i].question_id;
          if($scope.ans[$scope.a] == $scope.exam.questions[i].answer){
            $scope.obtained_marks += parseInt($scope.exam.questions[i].marks);
          }
        }
      }

      $scope.clear_local = function(){
        //  alert('clear');
        $localStorage.exam = '';
        $localStorage.exam_name = '';
        $localStorage.q_count = '';
        $localStorage.attempt_count = '';
        $localStorage.unAnswerQ = '';
        $localStorage.ans = '';
        $localStorage.schedule_exam_id = '';
        $localStorage.backkaydeto = ''
      }
  });
})();
