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
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
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
    return json([to('text', it), to('callback_data', it)]);
  }
  CalculatorKeyboard.prototype.toJson = function () {
    return json([to('inline_keyboard', reversed(toList(chunked(map(plus(map(plus(sequenceOf([-1, 0, -1]), take(this.numbers_0, Kotlin.imul(this.rows_0 - 2 | 0, this.cols_0))), CalculatorKeyboard$toJson$lambda), sequenceOf(['AC', '+', '-'])), CalculatorKeyboard$toJson$lambda_0), this.cols_0))))]);
  };
  function CalculatorKeyboard$numbers$lambda(it) {
    return it + 1 | 0;
  }
  CalculatorKeyboard.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CalculatorKeyboard',
    interfaces: []
  };
  function main$lambda$lambda$lambda(closure$res) {
    return function (response) {
      println('Message posted');
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda$lambda_0(closure$res) {
    return function (err) {
      println('Error : ' + err);
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda(closure$axios) {
    return function (req, res) {
      var tmp$, tmp$_0, tmp$_1;
      var body = req.body;
      var tmp$_2;
      if ((tmp$_0 = (tmp$ = asMessage(body.message)) != null ? contains(tmp$.text, '/start') ? tmp$ : null : null) != null) {
        var closure$axios_0 = closure$axios;
        println('message received ' + tmp$_0.text);
        closure$axios_0.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', tmp$_0.chat.id), to('text', '0'), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())])).then(main$lambda$lambda$lambda(res)).catch(main$lambda$lambda$lambda_0(res));
        '';
        tmp$_2 = tmp$_0;
      }
       else
        tmp$_2 = null;
      if (tmp$_2 == null) {
        if ((tmp$_1 = asCallbackQuery(body.callback_query)) != null) {
          println('callback received ' + tmp$_1.data);
        }
      }
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
  function asCallbackQuery(data) {
    var $receiver = new CallbackQuery(data);
    return $receiver.id.length > 0 ? $receiver : null;
  }
  function asMessage(data) {
    var $receiver = new Message(data);
    return $receiver.id !== -1 ? $receiver : null;
  }
  function CallbackQuery(data) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.id : null) === 'string' ? tmp$ : null) != null ? tmp$_0 : '';
    this.from = (tmp$_2 = Kotlin.isType(tmp$_1 = data != null ? data.from : null, User) ? tmp$_1 : null) != null ? tmp$_2 : new User(undefined);
    this.message = (tmp$_4 = Kotlin.isType(tmp$_3 = data != null ? data.message : null, Message) ? tmp$_3 : null) != null ? tmp$_4 : new Message(undefined);
    this.data = (tmp$_6 = typeof (tmp$_5 = data != null ? data.data : null) === 'string' ? tmp$_5 : null) != null ? tmp$_6 : '';
  }
  CallbackQuery.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CallbackQuery',
    interfaces: []
  };
  function Message(data) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.message_id : null) === 'number' ? tmp$ : null) != null ? tmp$_0 : -1;
    this.fromUser = (tmp$_2 = Kotlin.isType(tmp$_1 = data != null ? data.from : null, User) ? tmp$_1 : null) != null ? tmp$_2 : new User(undefined);
    this.chat = (tmp$_4 = Kotlin.isType(tmp$_3 = data != null ? data.chat : null, Chat) ? tmp$_3 : null) != null ? tmp$_4 : new Chat(undefined);
    this.text = (tmp$_6 = typeof (tmp$_5 = data != null ? data.text : null) === 'string' ? tmp$_5 : null) != null ? tmp$_6 : '';
  }
  Message.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Message',
    interfaces: []
  };
  function User(data) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.id : null) === 'number' ? tmp$ : null) != null ? tmp$_0 : -1;
    this.firstName = (tmp$_2 = typeof (tmp$_1 = data != null ? data.first_name : null) === 'string' ? tmp$_1 : null) != null ? tmp$_2 : '';
  }
  User.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'User',
    interfaces: []
  };
  function Chat(data) {
    var tmp$, tmp$_0;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.message_id : null) === 'number' ? tmp$ : null) != null ? tmp$_0 : -1;
  }
  Chat.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Chat',
    interfaces: []
  };
  _.CalculatorKeyboard = CalculatorKeyboard;
  _.main_kand9s$ = main;
  _.asCallbackQuery_za3rmp$ = asCallbackQuery;
  _.asMessage_za3rmp$ = asMessage;
  _.CallbackQuery = CallbackQuery;
  _.Message = Message;
  _.User = User;
  _.Chat = Chat;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
