'use strict';

angular.module('app.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function($scope, $http) {
        $scope.stats = [];
        $scope.current=0;
        $scope.max=100;
        $scope.blockProgress={
            "width": "0%"
        };
        $http.get(urlapi + 'stats')
            .then(function(data, status, headers, config) {
                console.log(data);
                $scope.stats = data.data;
                var tantpercent = ($scope.stats.realblockcount/$scope.stats.blockcount)*100;
                $scope.blockProgress={
                    "width": tantpercent+"%"
                };
                $scope.current=80;
            }, function(data, status, headers, config) {
                console.log('data error');
            });


        //last addr
        $scope.addresses = [];
        $http.get(urlapi + 'addresses/1/10')
            .then(function(data, status, headers, config) {
                console.log(data);
                $scope.addresses = data.data;
            }, function(data, status, headers, config) {
                console.log('data error');
            });

        //last tx
        $scope.txs = [];
        $http.get(urlapi + 'txs/1/10')
            .then(function(data, status, headers, config) {
                console.log(data);
                $scope.txs = data.data;
            }, function(data, status, headers, config) {
                console.log('data error');
            });

        //date analysis
        $scope.last24hour= {
            data:[],
            labels:  []
        };
        $http.get(urlapi + 'last24hour')
            .then(function(data, status, headers, config) {
                console.log(data);
                $scope.last24hour.data = data.data.data;
                $scope.last24hour.labels = data.data.labels;
            }, function(data, status, headers, config) {
                console.log('data error');
            });
        $scope.last7dayhour= {
            data:[],
            labels:  []
        };
        $http.get(urlapi + 'last7dayhour')
            .then(function(data, status, headers, config) {
                console.log(data);
                $scope.last7dayhour.data = data.data.data;
                $scope.last7dayhour.labels = data.data.labels;
                $scope.last7dayhour.series = data.data.series;
            }, function(data, status, headers, config) {
                console.log('data error');
            });

        $scope.last7day={
            data: [],
            labels: []
        };

        $http.get(urlapi + 'last7day')
            .then(function(data, status, headers, config) {
                console.log('data success');
                console.log(data);

                $scope.last7day.data = data.data.data;
                $scope.last7day.labels=data.data.labels;
            }, function(data, status, headers, config) {
                console.log('data error');
            });
    });
