'use strict';

angular.module('stockjumpApp')
  .controller('MainCtrl', function ($scope, $http, chartService) {

    var seriesOptions = [];

    $scope.stockSymbols = [];

    $scope.updateChart = function() {
      $http.get('/api/symbols').success(function (data) {

        if(data.length === 0) { //if no stock symbols
          $('.chart').highcharts().destroy(); //destroy the chart
        } else {
            console.log(data);
            $scope.allSymbols = data;

            //update stockSymbols
            $scope.stockSymbols = [];

            $scope.allSymbols.forEach(function (el) {
              $scope.stockSymbols.push(el.symbol);
            });

            var query = $scope.constructQuery($scope.stockSymbols);
            $scope.addStock(query);
        }
      });
    };



    $scope.addSymbol = function(symbol) {
        $http.post('/api/symbols', {symbol: symbol}).success(function() {

          //udpate list of symbols
          $scope.updateChart();

        });
    };


    $scope.deleteSymbol = function(_id) {
      $http.delete('/api/symbols/' + _id).success(function(data) {
        $('#' +_id).remove();
        $scope.updateChart();
      });
    };

    $scope.constructQuery = function(stockSymbols) {
      var query = '';
      var queryBeginning = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol in';
      var queryEnding = 'and startDate = "2015-01-01" and endDate = "2015-07-20"&format=json&diagnostics=true&env=http://datatables.org/alltables.env&format=json';
      //TODO: change endDate in query to reflect todays date..using Date method...
      var queryMiddle = '(';

      for (var i = 0; i < stockSymbols.length - 1; i++) {
        queryMiddle = queryMiddle + '"' + stockSymbols[i] + '"' + ", ";
      }

      queryMiddle = queryMiddle + '"' + stockSymbols[stockSymbols.length-1] + '")';

      query = queryBeginning + queryMiddle + queryEnding;
      return query;
    };


    $scope.addStock = function(query) { //send query to Yahoo Finance API, push appropriate data into seriesOptions Array, then render new chart with the data

      $http.get(query).success(function (data) {

        var seriesOptions = [];
        seriesOptions.push({name: data.query.results.quote[0].Symbol, data: []});

        //seriesOptions[0].name = data.query.results.quote[0].Symbol;
        var j = 0;

        for(var i = 0; i < data.query.results.quote.length; i++) {
          if (seriesOptions[j].name === data.query.results.quote[i].Symbol) {
            var arr = [];
            arr.push(Date.parse(data.query.results.quote[i].Date));
            arr.push(Number(data.query.results.quote[i].Open));

            seriesOptions[j].data.push(arr);
          } else {
            j++;
            seriesOptions.push({name: data.query.results.quote[i].Symbol,
                                data: [[Date.parse(data.query.results.quote[i].Date), Number(data.query.results.quote[i].Open)]]
                              }
            );
          }
        }
        if($('.chart').highcharts()) {//If there is a chart,
          $('.chart').highcharts().destroy(); // destroy the chart before...
        }
          chartService.makeChart(seriesOptions); //...building a new chart.
      });
    };

    $scope.updateChart(); //make chart when page loads
  });
