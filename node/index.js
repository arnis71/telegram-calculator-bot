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
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var generateSequence = Kotlin.kotlin.sequences.generateSequence_gexuht$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var removeAll = Kotlin.kotlin.collections.removeAll_qafx1e$;
  var equals = Kotlin.equals;
  var removePrefix = Kotlin.kotlin.text.removePrefix_gsj5wt$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  function CalculatorKeyboard(rows, cols) {
    CalculatorKeyboard$Companion_getInstance();
    if (rows === void 0)
      rows = 5;
    if (cols === void 0)
      cols = 3;
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
    return json([to('inline_keyboard', reversed(toList(chunked(map(plus(map(plus(sequenceOf([-1, 0, -1]), take(this.numbers_0, Kotlin.imul(this.rows_0 - 2 | 0, this.cols_0))), CalculatorKeyboard$toJson$lambda), sequenceOf([CalculatorKeyboard$Companion_getInstance().RESET, CalculatorKeyboard$Companion_getInstance().ADD, CalculatorKeyboard$Companion_getInstance().SUB])), CalculatorKeyboard$toJson$lambda_0), this.cols_0))))]);
  };
  function CalculatorKeyboard$Companion() {
    CalculatorKeyboard$Companion_instance = this;
    this.DEFAULT_INPUT = '0';
    this.RESET = 'AC';
    this.ADD = '+';
    this.SUB = '-';
  }
  CalculatorKeyboard$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var CalculatorKeyboard$Companion_instance = null;
  function CalculatorKeyboard$Companion_getInstance() {
    if (CalculatorKeyboard$Companion_instance === null) {
      new CalculatorKeyboard$Companion();
    }
    return CalculatorKeyboard$Companion_instance;
  }
  function CalculatorKeyboard$numbers$lambda(it) {
    return it + 1 | 0;
  }
  CalculatorKeyboard.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CalculatorKeyboard',
    interfaces: []
  };
  function get_keyboard() {
    return new CalculatorKeyboard();
  }
  function main$lambda$lambda$lambda(closure$instanceController, closure$it, closure$res) {
    return function (response) {
      var tmp$;
      var messageId = typeof (tmp$ = response.data.result.message_id) === 'number' ? tmp$ : throwCCE();
      var success = closure$instanceController.setMessageIdFor_5pdfst$(closure$it.fromUser, messageId);
      println('Message posted with id ' + messageId + ' from: ' + closure$it.fromUser.firstName);
      return closure$res.end(success ? 'ok' : 'error');
    };
  }
  function main$lambda$lambda$lambda_0(closure$res) {
    return function (err) {
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda$lambda$lambda$lambda(closure$res) {
    return function (f) {
      println('Callback posted');
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda$lambda$lambda_0(closure$res) {
    return function (err) {
      return closure$res.end('Error : ' + err);
    };
  }
  function main$lambda(closure$instanceController, closure$axios) {
    return function (req, res) {
      var tmp$, tmp$_0, tmp$_1;
      var body = req.body;
      var tmp$_2;
      if ((tmp$_0 = (tmp$ = asMessage(body.message)) != null ? contains(tmp$.text, '/start') ? tmp$ : null : null) != null) {
        var closure$instanceController_0 = closure$instanceController;
        var closure$axios_0 = closure$axios;
        println('Message ' + tmp$_0.text + ' received from: ' + tmp$_0.fromUser.firstName);
        closure$instanceController_0.incomingMessage_rphee1$(tmp$_0);
        tmp$_2 = closure$axios_0.post(Api_getInstance().forEndpoint_61zpoe$('sendMessage'), json([to('chat_id', tmp$_0.chat.id), to('text', CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT), to('reply_markup', get_keyboard().toJson())])).then(main$lambda$lambda$lambda(closure$instanceController_0, tmp$_0, res)).catch(main$lambda$lambda$lambda_0(res));
      }
       else
        tmp$_2 = null;
      if (tmp$_2 == null) {
        if ((tmp$_1 = asCallbackQuery(body.callback_query)) != null) {
          var closure$instanceController_1 = closure$instanceController;
          var closure$axios_1 = closure$axios;
          var tmp$_3;
          println('callback received from ' + tmp$_1.from.firstName + ', data ' + tmp$_1.data + ', message text ' + tmp$_1.message.text);
          if ((tmp$_3 = closure$instanceController_1.incomingCallback_y5sqzh$(tmp$_1)) != null) {
            closure$axios_1.post(Api_getInstance().forEndpoint_61zpoe$('editMessageText'), json([to('chat_id', tmp$_3.chat.id), to('message_id', tmp$_3.messageId), to('text', 'fixed text'), to('reply_markup', get_keyboard().toJson())])).then(main$lambda$lambda$lambda$lambda(res)).catch(main$lambda$lambda$lambda$lambda_0(res));
          }
          res.end('ok');
        }
      }
      return res.end('ok');
    };
  }
  function main$lambda_0(closure$port) {
    return function () {
      println('Telegram calculator bot listening on port ' + closure$port);
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
    this.processor = new Processor();
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
  function InstanceController$incomingMessage$lambda(closure$message) {
    return function (it) {
      return it.user.id === closure$message.fromUser.id;
    };
  }
  InstanceController.prototype.incomingMessage_rphee1$ = function (message) {
    removeAll(this.instances_0, InstanceController$incomingMessage$lambda(message));
    this.instances_0.add_11rb$(new Instance(message.fromUser, message.chat));
  };
  InstanceController.prototype.incomingCallback_y5sqzh$ = function (callbackQuery) {
    var tmp$;
    var $receiver = this.instances_0;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        if (element.user.id === callbackQuery.from.id) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    return (tmp$ = firstOrNull$result) != null ? tmp$.messageId === callbackQuery.message.id ? tmp$ : null : null;
  };
  InstanceController.prototype.setMessageIdFor_5pdfst$ = function (user, messageId) {
    var tmp$, tmp$_0;
    var tmp$_1;
    var $receiver = this.instances_0;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_2;
      tmp$_2 = $receiver.iterator();
      while (tmp$_2.hasNext()) {
        var element = tmp$_2.next();
        if (element.user.id === user.id) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    if ((tmp$ = firstOrNull$result) != null) {
      tmp$.messageId = messageId;
      tmp$_1 = true;
    }
     else
      tmp$_1 = null;
    return (tmp$_0 = tmp$_1) != null ? tmp$_0 : false;
  };
  InstanceController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InstanceController',
    interfaces: []
  };
  function Processor() {
    this.firstValue_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
    this.secondValue_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
    this.action_0 = null;
  }
  Processor.prototype.process_61zpoe$ = function (input) {
    var tmp$;
    var tmp$_0, tmp$_1;
    var tmp$_2;
    if ((tmp$ = equals(input, CalculatorKeyboard$Companion_getInstance().ADD) || equals(input, CalculatorKeyboard$Companion_getInstance().SUB) || equals(input, CalculatorKeyboard$Companion_getInstance().RESET) ? input : null) != null) {
      this.action_0 = tmp$;
      tmp$_2 = this.calculate_0(tmp$);
    }
     else
      tmp$_2 = null;
    var tmp$_3;
    if ((tmp$_0 = tmp$_2) != null)
      tmp$_3 = tmp$_0;
    else {
      var tmp$_4;
      if (this.action_0 != null) {
        this.secondValue_0 = removePrefix(this.secondValue_0, CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT) + input;
        tmp$_4 = this.secondValue_0;
      }
       else
        tmp$_4 = null;
      tmp$_3 = tmp$_4;
    }
    var tmp$_5;
    if ((tmp$_1 = tmp$_3) != null)
      tmp$_5 = tmp$_1;
    else {
      this.firstValue_0 = removePrefix(this.firstValue_0, CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT) + input;
      tmp$_5 = this.firstValue_0;
    }
    return tmp$_5;
  };
  Processor.prototype.calculate_0 = function (actionTitle) {
    var tmp$;
    switch (actionTitle) {
      case 'AC':
        var $receiver = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
        this.firstValue_0 = $receiver;
        this.secondValue_0 = $receiver;
        tmp$ = $receiver;
        break;
      case '+':
        var $receiver_0 = (toInt(this.firstValue_0) + toInt(this.secondValue_0) | 0).toString();
        this.firstValue_0 = $receiver_0;
        this.secondValue_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
        tmp$ = $receiver_0;
        break;
      case '-':
        var $receiver_1 = (toInt(this.firstValue_0) - toInt(this.secondValue_0) | 0).toString();
        this.firstValue_0 = $receiver_1;
        this.secondValue_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
        tmp$ = $receiver_1;
        break;
      default:tmp$ = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
        break;
    }
    return tmp$;
  };
  Processor.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Processor',
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
  function Api() {
    Api_instance = this;
    this.BASE_URL_0 = 'https://api.telegram.org/';
    this.KEY_0 = '518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4';
  }
  Api.prototype.forEndpoint_61zpoe$ = function (path) {
    return this.BASE_URL_0 + 'bot' + this.KEY_0 + '/' + path;
  };
  Api.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Api',
    interfaces: []
  };
  var Api_instance = null;
  function Api_getInstance() {
    if (Api_instance === null) {
      new Api();
    }
    return Api_instance;
  }
  Object.defineProperty(CalculatorKeyboard, 'Companion', {
    get: CalculatorKeyboard$Companion_getInstance
  });
  _.CalculatorKeyboard = CalculatorKeyboard;
  Object.defineProperty(_, 'keyboard', {
    get: get_keyboard
  });
  _.main_kand9s$ = main;
  _.Instance = Instance;
  _.InstanceController = InstanceController;
  _.Processor = Processor;
  _.asCallbackQuery_za3rmp$ = asCallbackQuery;
  _.asMessage_za3rmp$ = asMessage;
  _.CallbackQuery = CallbackQuery;
  _.Message = Message;
  _.User = User;
  _.Chat = Chat;
  Object.defineProperty(_, 'Api', {
    get: Api_getInstance
  });
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
