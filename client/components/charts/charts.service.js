 'use strict';

angular.module('stockjumpApp')
.service('chartService', function() {

    this.makeChart = function(seriesOptions) {
      $('.chart').highcharts('StockChart', {
        chart: {
          backgroundColor: '#F0EEE7'
        },
        colors: ['#3FB6D7', '#FA8B60', '#442D65', '#91C5A9', '#202020'],
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
          valueDecimals: 2
        },
        yAxis: {
          gridLineColor: 'transparent',
          labels: {
            enabled: false
          }
        },
        xAxis: {
          labels: {
            enabled: false
          },
          lineColor: 'transparent'
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        series: seriesOptions
      });
    };

    this.makeChartData = function(data) {
      /* extract the date and stock value from data returned from Yahoo Finance API request, */
      /* and put the data into the format required by highcharts */

      var chartData = {};

      chartData.name = data.query.results.quote[0].Symbol;

      chartData.data = data.query.results.quote.map(function(el) {
        var arr = [];
        arr.push(Date.parse(el.Date));
        arr.push(parseInt(el.Open));
        return arr;
      });

      return chartData;

    }
  }
);
