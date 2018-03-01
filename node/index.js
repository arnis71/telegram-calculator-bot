(function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var Unit = Kotlin.kotlin.Unit;
  function main$lambda$lambda(closure$res) {
    return function (f) {
      println('Message posted');
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda_0(closure$res) {
    return function (err) {
      println('Error : ' + err);
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda(closure$axios) {
    return function (req, res) {
      var tmp$, tmp$_0;
      var message = req.body;
      println('message received ' + message.text);
      if (message == null || ((tmp$_0 = (tmp$ = message.text) != null ? tmp$.toString() : null) != null ? contains(tmp$_0, 'marco', true) : null) === true) {
        return res.end();
      }
      return closure$axios.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', message.chat.id), to('text', 'Polo!!')])).then(main$lambda$lambda(res)).catch(main$lambda$lambda_0(res));
    };
  }
  function main$lambda_0(closure$port) {
    return function () {
      println('Telegram app listening on port ' + closure$port + '!');
      return Unit;
    };
  }
  function main(args) {
    var tmp$;
    var express = require('express');
    var parser = require('body-parser');
    var axios = require('axios');
    var app = express();
    app.use(parser.json());
    app.use(parser.urlencoded(json([to('extended', true)])));
    var port = (tmp$ = process.env.PORT) != null ? tmp$ : 3000;
    println('port ' + port);
    app.post('/new-message', main$lambda(axios));
    app.listen(port, main$lambda_0(port));
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
