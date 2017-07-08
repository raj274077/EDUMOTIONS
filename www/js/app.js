// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

 var app = angular.module('app', ['login','change_password','submitExam','practiceTestList','selectTestList', 'viewResult','viewResultDetails','userProfile','exam','ionic','app.controllers', 'app.routes', 'app.directives','app.services','ngStorage'])
.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }
            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});
angular.module('app.routes', [])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //     .state('menu.login', {
  //   url: '/login',
  //   cache: false,
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'templates/login.html',
  //       // controller: 'loginCtrl'
  //     }
  //   }
  // })

  .state('dashboard',{
            url:'/dashboard',
        templateUrl:'templates/dashboard.html',
  // controller: 'dashboardCtrl'
    })

    .state('select_test',{
              url:'/select_test',
                // cache: false,
          templateUrl:'templates/select_test.html',

      })



  .state('examInstruction',{
            url:'/examInstruction',
        templateUrl:'templates/examInstruction.html',

    })
    .state('contactUs',{
              url:'/contactUs',
          templateUrl:'templates/contactUs.html',

      })
    .state('changepass',{
              url:'/changepass',
              cache: false,
          templateUrl:'templates/changepass.html',
          controller:'change_passwordCntrl'

      })
    .state('exam',{
            url:'/exam',
            cache: false,
        templateUrl:'templates/exam.html',
          // controller:'examController'
    })
    .state('exam_details',{
            url:'/exam_details',
            cache: false,
        templateUrl:'templates/exam_details.html',
        // controller:'submitExamCntrl'
    })

    .state('practice_test',{
            url:'/practice_test',
            cache: false,
        templateUrl:'templates/practice_test.html',
        // controller:'submitExamCntrl'
    })
    .state('view_result',{
            url:'/view_result',
            cache: false,
        templateUrl:'templates/view_result.html',
        // controller:'submitExamCntrl'
    })


  .state('view_result_details',{
            url:'/view_result_details',
            cache: false,
        templateUrl:'templates/view_result_details.html',
      //  controller:'viewDetailsCntrl'

    })


      .state('user_profile',{
                url:'/Profile',
                cache: false,
            templateUrl:'templates/user_profile.html',
          //  controller:'viewDetailsCntrl'

        })



  // .state('menu', {
  //   url: '/side-menu21',
  //   templateUrl: 'templates/menu.html',
  //   controller: 'loginCtrl'
  // })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/login')

});
