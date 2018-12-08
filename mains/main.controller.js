liveStockApp.controller('MainController', ['$scope', '$rootScope', '$mdSidenav', '$location',
    function ($scope, $rootScope, $mdSidenav, $location) {

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        $scope.selectedMenu = 0;
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        // $scope.toggleLeft();
        $scope.navMenu = function (menu, selectedMenu) {
            $scope.toggleLeft();
            $scope.selectedMenu = selectedMenu;
            $location.path(menu);
        }
    }]);
