(function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
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
      var message = req.body.message;
      if (!contains(message.text.toString(), 'marco', true)) {
        return res.end();
      }
      return closure$axios.post('https://api.telegram.org/518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', message.chat.id), to('text', 'Polo!!')])).then(main$lambda$lambda(res)).catch(main$lambda$lambda_0(res));
    };
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
    app.post('/new-message', main$lambda(axios));
    app.listen(3000, main$lambda_0);
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
