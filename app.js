var myApp = angular.module('myApp', ['ngRoute']);


//route
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "./pages/first/first.html",
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: './pages/second/second.html',
            controller: 'mainController'
        })

})


myApp.service('nameService', function () {
    var self = this;

    this.name = 'anonymus'

    this.namelength = function () {
        return self.name.length;
    }
})



//mainController
myApp.controller('mainController', ['$scope', '$timeout', '$http', '$log', '$location', function ($scope, $timeout, $http, $log, $location) {



    $scope.name = ""
    $scope.handle = ""
    $scope.books = []
    $scope.addData = {
        title: '',
        author: '',
        year: ''
    }

    $scope.move = function () {
        $location.path('/second')
    }

    $scope.changeName = function () {
        $scope.name = $scope.handle
        $timeout(function () {
            $scope.greeting = `HI !!! nice to meet you ${$scope.name}`
        }, 3000)

    }

    $http({
        method: 'GET',
        url: 'https://remembering-golang.herokuapp.com/books'
    }).then(function successCallback(response) {
        $scope.books = response.data
        $log.log($scope.books.length)
    }, function errorCallback(response) {
        $logS.log(response)
    });

    $scope.addBook = function () {
        $http.post('https://remembering-golang.herokuapp.com/addBook',
            $scope.addData
        ).then(function success(result) {
            $scope.books.push(result.data);
            $scope.addData = {}
        }, function error(result) {
            $log.log(result)
        })
    }

    console.log($scope.addData)

}])


//secondController
myApp.controller('secondController', ['$scope', '$log', function ($scope, $log) {

    $scope.title = 'AngularJS'
    $scope.title2 = ''


    $scope.changeTitle = function () {

        if ($scope.title2.length <= 0) {
            $scope.title2 = $scope.title
            return
        } else if ($scope.title2 !== 0) {
            $scope.title = $scope.title2
            $scope.title2 = ""
            return
        }

    }

}])