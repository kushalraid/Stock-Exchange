liveStockApp.controller('DashboardController', ['$scope', '$rootScope', '$location', 'SocketService', 'StockMaintainService',
    function ($scope, $rootScope, $location, SocketService, StockMaintainService) {

        $scope.selectedMenu = 0;

        SocketService.send({});

        $scope.liveStockData = StockMaintainService.stock;

        SocketService.onmessage(function (event) {
            if (event.isTrusted) {
                var updatedStock = event.data;
            }
            StockMaintainService.updateStock(JSON.parse(updatedStock));
            $scope.liveStockData = StockMaintainService.stock;
            $scope.createGraph($rootScope.selectedGraphStock, $scope.liveStockData[$rootScope.selectedGraphStock]);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            if ($scope.api1) {
                $scope.api1.refresh();
            }
        });

        // $scope.$on('$routeChangeStart', function (scope, next, current) {
        //     SocketService.close();
        //     console.log('Socked Closed');
        // });

        $rootScope.selectedGraphStock;

        $scope.createGraph = function (key, value) {
            $rootScope.selectedGraphStock = key;
            $scope.graph = {}
            $scope.graph.optionsLineChart = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    width: 500,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d) { return new Date(d.x); },
                    y: function (d) { return d.y; },
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function (e) { console.log("stateChange"); },
                        changeState: function (e) { console.log("changeState"); },
                        tooltipShow: function (e) { console.log("tooltipShow"); },
                        tooltipHide: function (e) { console.log("tooltipHide"); }
                    },
                    xAxis: {
                        axisLabel: 'Time (ms)'
                    },
                    yAxis: {
                        axisLabel: 'Price ',
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: -10
                    },
                    callback: function (chart) {
                        console.log("!!! lineChart callback !!!");
                    },
                    showXAxis: false
                },
                title: {
                    enable: true,
                    text: 'Graph for Ticker "' + key + '"'
                }
            }

            var graphDataToRender = [];

            //Data is represented as an array of {x,y} pairs.
            if (value) {
                var valuesData = value["values"];
                for (var i = 0; i < valuesData.length; i++) {
                    graphDataToRender.push({ x: value["times"][i], y: valuesData[i] });
                }
            }

            $scope.graph.data = [
                {
                    values: graphDataToRender,      //values - represents the array of {x,y} data points
                    key: key, //key  - the name of the series.
                    color: '#ff7f0e',  //color - optional: choose your own line color.
                    strokeWidth: 2,
                    classed: 'dashed'
                }
            ];

            if ($scope.api1) {
                $scope.api1.refresh();
            }

        };

    }])
