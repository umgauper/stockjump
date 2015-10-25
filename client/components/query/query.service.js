'use strict';

angular.module('stockjumpApp')
  .service('queryService', function() {
    this.constructQuery = function(stockSymbols) {
      var query = '';
      var query0 = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol in';
      var query2 = 'and startDate = "2015-01-01" and endDate = "';
      var query3 = '"&format=json&diagnostics=true&env=http://datatables.org/alltables.env&format=json';

      /* Create string of today's date for endDate in query. */

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();

      if(month < 10) {
        month = '0' + month;
      }

      var endDate = year + '-' + month + '-' + date;

      /* Put stock symbols in correct format for query. */

      var query1 = stockSymbols.reduce(function(prev, cur, index, arr) {
        if(index !== arr.length-1) {
          return prev + '"' + cur + '"' + ", ";
        } else {
          return prev + '"' + cur + '"' + ')';
        }
      }, '(');


      query = query0 + query1 + query2 + endDate + query3;

      return query;

    }
  });
