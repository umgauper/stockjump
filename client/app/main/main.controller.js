'use strict';

angular.module('stockjumpApp')
  .controller('MainCtrl', function ($scope, $http, chartService, queryService) {
    $scope.updateChart = function() {
      $http.get('/api/symbols').success(function (data) {

        //If no stock symbols left, destroy the chart.
        if(data.length === 0) {
          $('.chart').highcharts().destroy();
        } else {
            $scope.stockSymbols = data;

            var seriesOptions = [];

            $scope.stockSymbols.forEach(function(el) { //send query to yahooAPI for each symbol

              var query = queryService.constructQuery(el.symbol);

              $http.get(query).success(function(data) {
                var chartData = chartService.makeChartData(data); //parse data from yahoo and turn into format required by highcharts, e.g. [{name: "MSFT", data: [[x, y], [x, y], [x, y]}]
                seriesOptions.push(chartData);
                if(seriesOptions.length === $scope.stockSymbols.length) {
                  $scope.graphNewStock(seriesOptions);
                }
              });
            });
        }
      });
    };

    $scope.addSymbol = function(symbol) {
        $http.post('/api/symbols', {symbol: symbol}).success(function() {
          $scope.updateChart();
          $scope.symbol = '';
        });
    };

    $scope.deleteSymbol = function(_id) {
      $http.delete('/api/symbols/' + _id).success(function(data) {
        $('#' +_id).remove();
        $scope.updateChart();
      });
    };

    $scope.graphNewStock = function(seriesOptions) {

        //If a chart exists, destroy the chart before building a new chart.

        if($('.chart').highcharts()) {
          $('.chart').highcharts().destroy();
        }

        chartService.makeChart(seriesOptions);
    };

    //Make chart when page first loads.
    $scope.updateChart();

  });
