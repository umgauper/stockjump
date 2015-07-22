'use strict';

angular.module('stockjumpApp')
.service('chartService', function() {

    this.makeChart = function(seriesOptions) {
      $('.chart').highcharts('StockChart', {
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
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



  }
);
