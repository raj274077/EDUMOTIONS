(function () {
    'use strict'
    //code goes here.
    angular.module("app").controller("change_passwordCntrl", function ($scope, $http, $state, $localStorage,$log){
    if($localStorage.username == ''|| $localStorage.username == null){
      $state.go('login');
    }
        $scope.change_password = function(){
            $scope.current_pass = document.getElementById('current_pass').value;
            $scope.new_pass = document.getElementById('new_pass').value;
            $scope.confirm_pass = document.getElementById('confirm_pass').value;
            if($scope.new_pass == $scope.confirm_pass){
                $http.post("http://enclaveengg.com/projects/examportal/api/change_password.php",{'user_id':$localStorage.username, 'current_pass':$scope.current_pass, 'new_pass':$scope.new_pass})
                .success(function(data){
                    console.log(data);
                    if(data.success == '1'){
                        alert('Password changed successfully');
                    }
                    else{
                        alert("Current Password is not correct, please try again");
                    }
                })
                .error(function(data){
                   alert("Something went wrong, please try again.");
               });
            }
            else{
                alert("'Confirm Password' does not match with 'New Password'");
            }
        }
    });
})();
