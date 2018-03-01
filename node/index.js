(function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  function main$lambda(req, res) {
    return res.send('ok');
  }
  function main$lambda_0() {
    println('Telegram app listening on port 3000!');
    return Unit;
  }
  function main(args) {
    var express = require('express');
    var parser = require('body-parser');
    var axios = require('axios');
    var app = express();
    app.use(parser.json());
    app.use(parser.urlencoded(json([to('extended', true)])));
    app.get('/new-message', main$lambda);
    app.listen(3000, main$lambda_0);
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
