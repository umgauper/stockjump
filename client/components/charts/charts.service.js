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

      var seriesOptions = [];
      var j = 0;

      seriesOptions.push({name: data.query.results.quote[0].Symbol, data: []});

      for(var i = 0; i < data.query.results.quote.length; i++) {
        if (seriesOptions[j].name === data.query.results.quote[i].Symbol) {
          var arr = [];
          arr.push(Date.parse(data.query.results.quote[i].Date));
          arr.push(Number(data.query.results.quote[i].Open));
          seriesOptions[j].data.push(arr);
        } else {
          j++;
          seriesOptions.push({
              name: data.query.results.quote[i].Symbol,
              data: [[
                Date.parse(data.query.results.quote[i].Date),
                Number(data.query.results.quote[i].Open)
              ]]
            }
          );
        }
      }
      return seriesOptions
    }
  }
);
