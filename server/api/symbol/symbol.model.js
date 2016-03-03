'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SymbolSchema = new Schema({
  name: String,
  info: String,
  symbol: String,
  active: Boolean
});

module.exports = mongoose.model('Symbol', SymbolSchema);
