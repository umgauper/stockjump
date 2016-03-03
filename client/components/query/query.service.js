'use strict';

angular.module('stockjumpApp')
  .service('queryService', function() {
    this.constructQuery = function(symbol) {
      var query = '';
      var queryStart = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol in(';
      var queryDates = ')and startDate = "2015-01-01" and endDate = "';
      var queryEnd = '"&format=json&diagnostics=true&env=http://datatables.org/alltables.env&format=json';

      /* Create string of today's date for endDate in query. */

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();

      if(month < 10) {
        month = '0' + month;
      }

      var endDate = `${year}-${month}-${date}`;

      query = `${queryStart}"${symbol}"${queryDates}${endDate}${queryEnd}`;

      return query;
    }
  });
