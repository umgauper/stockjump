'use strict';

angular.module('stockjumpApp')
  .controller('MainCtrl', function ($scope, $http, chartService, queryService) {


    $scope.updateChart = function() {
      $http.get('/api/symbols').success(function (data) {

        /* If no stock symbols left, destroy the chart. */
        if(data.length === 0) {
          $('.chart').highcharts().destroy();
        } else {
            $scope.stockSymbols = data;

            var query = queryService.constructQuery($scope.stockSymbols.map(function(el) { return el.symbol }));
            $scope.graphNewStock(query);
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

    /* Send query to Yahoo Finance API, then render new chart with the response data. */
    $scope.graphNewStock = function(query) {
      $http.get(query).success(function (data) {

        var seriesOptions = chartService.makeChartData(data);

        /*If a chart exists, destroy the chart before building a new chart. */

        if($('.chart').highcharts()) {
          $('.chart').highcharts().destroy();
        }
          chartService.makeChart(seriesOptions);
      });
    };

    /* Make chart when page first loads. */
    $scope.updateChart();

  });
