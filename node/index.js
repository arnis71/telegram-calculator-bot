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
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  function CalculatorKeyboard(rows, cols) {
    this.rows_0 = rows;
    this.cols_0 = cols;
    this.numbers_0 = generateSequence(1, CalculatorKeyboard$numbers$lambda);
  }
  function CalculatorKeyboard$toJson$lambda(it) {
    return it === -1 ? '' : it.toString();
  }
  function CalculatorKeyboard$toJson$lambda_0(it) {
    return json([to('text', it), to('callback_data', 'data' + it)]);
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
  function main$lambda$lambda$lambda(closure$instanceController, this$, closure$res) {
    return function (response) {
      var tmp$;
      var data = response.data;
      var messageId = typeof (tmp$ = data.result.message_id) === 'number' ? tmp$ : throwCCE();
      closure$instanceController.setMessageIdFor_5pdfst$(this$.fromUser, messageId);
      println('Message posted with id ' + messageId + ', from user ' + this$.fromUser.firstName);
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda$lambda_0(closure$res) {
    return function (err) {
      println('Error : ' + err);
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda$lambda$lambda_1(closure$res) {
    return function (response) {
      println('Callback posted');
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda$lambda_2(closure$res) {
    return function (err) {
      println('Error : ' + err);
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda(closure$instanceController, closure$axios) {
    return function (req, res) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2;
      var body = req.body;
      var tmp$_3;
      if ((tmp$_0 = (tmp$ = asMessage(body.message)) != null ? contains(tmp$.text, '/start') ? tmp$ : null : null) != null) {
        var closure$instanceController_0 = closure$instanceController;
        var closure$axios_0 = closure$axios;
        println('message received from: ' + tmp$_0.fromUser.firstName + ', text: ' + tmp$_0.text + ', chatId: ' + tmp$_0.chat.id);
        closure$instanceController_0.incomingMessage_rphee1$(tmp$_0);
        closure$axios_0.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', tmp$_0.chat.id), to('text', '0'), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())])).then(main$lambda$lambda$lambda(closure$instanceController_0, tmp$_0, res)).catch(main$lambda$lambda$lambda_0(res));
        '';
        tmp$_3 = tmp$_0;
      }
       else
        tmp$_3 = null;
      var tmp$_4;
      if ((tmp$_2 = tmp$_3) != null)
        tmp$_4 = tmp$_2;
      else {
        var tmp$_5;
        if ((tmp$_1 = asCallbackQuery(body.callback_query)) != null) {
          var closure$axios_1 = closure$axios;
          var closure$instanceController_1 = closure$instanceController;
          println('callback received from ' + tmp$_1.from.firstName + ', data ' + tmp$_1.data + ', message text ' + tmp$_1.message.text);
          closure$axios_1.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/editMessageText', closure$instanceController_1.requestFromCallback_y5sqzh$(tmp$_1)).then(main$lambda$lambda$lambda_1(res)).catch(main$lambda$lambda$lambda_2(res));
          '';
          tmp$_5 = tmp$_1;
        }
         else
          tmp$_5 = null;
        tmp$_4 = tmp$_5;
      }
      return tmp$_4;
    };
  }
  function main$lambda_0(closure$port) {
    return function () {
      println('Telegram app listening on port ' + closure$port);
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
    var instanceController = new InstanceController();
    app.post('/new-message', main$lambda(instanceController, axios));
    app.listen(port, main$lambda_0(port));
  }
  function Instance(user, chat, messageId) {
    if (messageId === void 0)
      messageId = -1;
    this.user = user;
    this.chat = chat;
    this.messageId = messageId;
  }
  Instance.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Instance',
    interfaces: []
  };
  Instance.prototype.component1 = function () {
    return this.user;
  };
  Instance.prototype.component2 = function () {
    return this.chat;
  };
  Instance.prototype.component3 = function () {
    return this.messageId;
  };
  Instance.prototype.copy_g9o78r$ = function (user, chat, messageId) {
    return new Instance(user === void 0 ? this.user : user, chat === void 0 ? this.chat : chat, messageId === void 0 ? this.messageId : messageId);
  };
  Instance.prototype.toString = function () {
    return 'Instance(user=' + Kotlin.toString(this.user) + (', chat=' + Kotlin.toString(this.chat)) + (', messageId=' + Kotlin.toString(this.messageId)) + ')';
  };
  Instance.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.user) | 0;
    result = result * 31 + Kotlin.hashCode(this.chat) | 0;
    result = result * 31 + Kotlin.hashCode(this.messageId) | 0;
    return result;
  };
  Instance.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.user, other.user) && Kotlin.equals(this.chat, other.chat) && Kotlin.equals(this.messageId, other.messageId)))));
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function InstanceController() {
    this.instances_0 = ArrayList_init();
  }
  var Collection = Kotlin.kotlin.collections.Collection;
  InstanceController.prototype.incomingMessage_rphee1$ = function (message) {
    var tmp$ = contains(message.text, '/start');
    if (tmp$) {
      var $receiver = this.instances_0;
      var none$result;
      none$break: do {
        var tmp$_0;
        if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
          none$result = true;
          break none$break;
        }
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (element.user.id === message.fromUser.id) {
            none$result = false;
            break none$break;
          }
        }
        none$result = true;
      }
       while (false);
      tmp$ = none$result;
    }
    if (tmp$) {
      this.newInstance_0(message);
    }
  };
  InstanceController.prototype.requestFromCallback_y5sqzh$ = function (callbackQuery) {
    var $receiver = this.instances_0;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.user.id === callbackQuery.from.id) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    var it = ensureNotNull(firstOrNull$result);
    return json([to('chat_id', it.chat.id), to('message_id', it.messageId), to('text', callbackQuery.message.text + callbackQuery.data), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())]);
  };
  InstanceController.prototype.setMessageIdFor_5pdfst$ = function (user, messageId) {
    var $receiver = this.instances_0;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.user.id === user.id) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    ensureNotNull(firstOrNull$result).messageId = messageId;
  };
  InstanceController.prototype.newInstance_0 = function (message) {
    return this.instances_0.add_11rb$(new Instance(message.fromUser, message.chat));
  };
  InstanceController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InstanceController',
    interfaces: []
  };
  function asCallbackQuery(data) {
    var $receiver = new CallbackQuery(data);
    return $receiver.id.length > 0 ? $receiver : null;
  }
  function asMessage(data) {
    var $receiver = new Message(data);
    return $receiver.id !== -1 ? $receiver : null;
  }
  function CallbackQuery(data) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.id : null) === 'string' ? tmp$ : null) != null ? tmp$_0 : '';
    this.from = new User(data != null ? data.from : null);
    this.message = new Message(data != null ? data.message : null);
    this.data = (tmp$_2 = typeof (tmp$_1 = data != null ? data.data : null) === 'string' ? tmp$_1 : null) != null ? tmp$_2 : '';
  }
  CallbackQuery.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CallbackQuery',
    interfaces: []
  };
  function Message(data) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.message_id : null) === 'number' ? tmp$ : null) != null ? tmp$_0 : -1;
    this.fromUser = new User(data != null ? data.from : null);
    this.chat = new Chat(data != null ? data.chat : null);
    this.text = (tmp$_2 = typeof (tmp$_1 = data != null ? data.text : null) === 'string' ? tmp$_1 : null) != null ? tmp$_2 : '';
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
    this.id = (tmp$_0 = typeof (tmp$ = data != null ? data.id : null) === 'number' ? tmp$ : null) != null ? tmp$_0 : -1;
  }
  Chat.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Chat',
    interfaces: []
  };
  _.CalculatorKeyboard = CalculatorKeyboard;
  _.main_kand9s$ = main;
  _.Instance = Instance;
  _.InstanceController = InstanceController;
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
