var liveStockApp = angular.module('liveStockApp', ['ngRoute', 'ngMaterial',
    'md.data.table', 'ngMessages', 'ngAnimate', 'nvd3']);

liveStockApp.run(['$rootScope', function ($rootScope) {

}]);

liveStockApp.config(['$routeProvider', function ($routeProvider) {

    var tplUrlCommon = 'partials/views';

    $routeProvider
        .when('/dashboard', {
            templateUrl: tplUrlCommon + '/dashboard.html',
            title: 'Stock Exchange Application',
            controller: 'DashboardController'
        })
        .when('/extra', {
            templateUrl: tplUrlCommon + '/extra.html',
            title: 'Stock Exchange Application',
            controller: 'ExtraController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
}]);