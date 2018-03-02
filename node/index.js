(function (_, Kotlin) {
  'use strict';
  var sequenceOf = Kotlin.kotlin.sequences.sequenceOf_i5x0yv$;
  var take = Kotlin.kotlin.sequences.take_wuwhe2$;
  var plus = Kotlin.kotlin.sequences.plus_v0iwhp$;
  var map = Kotlin.kotlin.sequences.map_z5avom$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var chunked = Kotlin.kotlin.sequences.chunked_wuwhe2$;
  var toList = Kotlin.kotlin.sequences.toList_veqyi0$;
  var reversed = Kotlin.kotlin.collections.reversed_7wnvza$;
  var generateSequence = Kotlin.kotlin.sequences.generateSequence_gexuht$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var Unit = Kotlin.kotlin.Unit;
  function CalculatorKeyboard(rows, cols) {
    this.rows_0 = rows;
    this.cols_0 = cols;
    this.numbers_0 = generateSequence(1, CalculatorKeyboard$numbers$lambda);
  }
  function CalculatorKeyboard$toJson$lambda(it) {
    return it === -1 ? '' : it.toString();
  }
  function CalculatorKeyboard$toJson$lambda_0(it) {
    return json([to('text', it)]);
  }
  CalculatorKeyboard.prototype.toJson = function () {
    return json([to('keyboard', reversed(toList(chunked(map(plus(map(plus(sequenceOf([-1, 0, -1]), take(this.numbers_0, Kotlin.imul(this.rows_0 - 2 | 0, this.cols_0))), CalculatorKeyboard$toJson$lambda), sequenceOf(['AC', '+', '-'])), CalculatorKeyboard$toJson$lambda_0), this.cols_0))))]);
  };
  function CalculatorKeyboard$numbers$lambda(it) {
    return it + 1 | 0;
  }
  CalculatorKeyboard.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CalculatorKeyboard',
    interfaces: []
  };
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
      var message = req.body.message;
      println('message received ' + message.text);
      if (((tmp$_0 = (tmp$ = message != null ? message.text : null) != null ? tmp$.toString() : null) != null ? contains(tmp$_0, '/start') : null) === true) {
        return closure$axios.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', message.chat.id), to('text', '0'), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())])).then(main$lambda$lambda(res)).catch(main$lambda$lambda_0(res));
      }
       else
        return res.end();
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
    app.post('/new-message', main$lambda(axios));
    app.listen(port, main$lambda_0(port));
  }
  _.CalculatorKeyboard = CalculatorKeyboard;
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
