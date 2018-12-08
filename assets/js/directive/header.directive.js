liveStockApp.directive('appHeader', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'partials/templates/header.html',
        link: function (scope, element, attrs, ctrl) {
            scope.title = attrs.title;
        }
    }
}]);