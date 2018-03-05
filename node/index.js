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
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var equals = Kotlin.equals;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var removeAll = Kotlin.kotlin.collections.removeAll_qafx1e$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var removePrefix = Kotlin.kotlin.text.removePrefix_gsj5wt$;
  CalculatorAction.prototype = Object.create(Enum.prototype);
  CalculatorAction.prototype.constructor = CalculatorAction;
  function CalculatorKeyboard(rows, cols) {
    CalculatorKeyboard$Companion_getInstance();
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
    return json([to('inline_keyboard', reversed(toList(chunked(map(plus(map(plus(sequenceOf([-1, 0, -1]), take(this.numbers_0, Kotlin.imul(this.rows_0 - 2 | 0, this.cols_0))), CalculatorKeyboard$toJson$lambda), sequenceOf([CalculatorAction$RESET_getInstance().title, CalculatorAction$ADD_getInstance().title, CalculatorAction$SUB_getInstance().title])), CalculatorKeyboard$toJson$lambda_0), this.cols_0))))]);
  };
  function CalculatorKeyboard$Companion() {
    CalculatorKeyboard$Companion_instance = this;
    this.DEFAULT_INPUT = '0';
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
  function CalculatorAction(name, ordinal, title) {
    Enum.call(this);
    this.title = title;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function CalculatorAction_initFields() {
    CalculatorAction_initFields = function () {
    };
    CalculatorAction$RESET_instance = new CalculatorAction('RESET', 0, 'AC');
    CalculatorAction$ADD_instance = new CalculatorAction('ADD', 1, '+');
    CalculatorAction$SUB_instance = new CalculatorAction('SUB', 2, '-');
  }
  var CalculatorAction$RESET_instance;
  function CalculatorAction$RESET_getInstance() {
    CalculatorAction_initFields();
    return CalculatorAction$RESET_instance;
  }
  var CalculatorAction$ADD_instance;
  function CalculatorAction$ADD_getInstance() {
    CalculatorAction_initFields();
    return CalculatorAction$ADD_instance;
  }
  var CalculatorAction$SUB_instance;
  function CalculatorAction$SUB_getInstance() {
    CalculatorAction_initFields();
    return CalculatorAction$SUB_instance;
  }
  CalculatorAction.prototype.calculate_puj7f4$ = function (firstValue, secondValue) {
    var tmp$, tmp$_0;
    println('calculating ' + firstValue + ' ' + this.title + ' ' + secondValue);
    tmp$ = this.title;
    if (equals(tmp$, CalculatorAction$RESET_getInstance().title))
      tmp$_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
    else if (equals(tmp$, CalculatorAction$ADD_getInstance().title))
      tmp$_0 = (toInt(firstValue) + toInt(secondValue) | 0).toString();
    else if (equals(tmp$, CalculatorAction$SUB_getInstance().title))
      tmp$_0 = (toInt(firstValue) - toInt(secondValue) | 0).toString();
    else
      tmp$_0 = CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT;
    return tmp$_0;
  };
  CalculatorAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CalculatorAction',
    interfaces: [Enum]
  };
  function CalculatorAction$values() {
    return [CalculatorAction$RESET_getInstance(), CalculatorAction$ADD_getInstance(), CalculatorAction$SUB_getInstance()];
  }
  CalculatorAction.values = CalculatorAction$values;
  function CalculatorAction$valueOf(name) {
    switch (name) {
      case 'RESET':
        return CalculatorAction$RESET_getInstance();
      case 'ADD':
        return CalculatorAction$ADD_getInstance();
      case 'SUB':
        return CalculatorAction$SUB_getInstance();
      default:throwISE('No enum constant CalculatorAction.' + name);
    }
  }
  CalculatorAction.valueOf_61zpoe$ = CalculatorAction$valueOf;
  function main$lambda$lambda$lambda(closure$instanceController, this$, closure$res) {
    return function (response) {
      var tmp$;
      var messageId = typeof (tmp$ = response.data.result.message_id) === 'number' ? tmp$ : throwCCE();
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
  function main$lambda$lambda$lambda$lambda(closure$res) {
    return function (f) {
      println('Callback posted');
      return closure$res.end('ok');
    };
  }
  function main$lambda$lambda$lambda$lambda_0(closure$res) {
    return function (err) {
      println('Error : ' + err);
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
        println('message received from: ' + tmp$_0.fromUser.firstName + ', text: ' + tmp$_0.text + ', chatId: ' + tmp$_0.chat.id);
        closure$instanceController_0.incomingMessage_rphee1$(tmp$_0);
        closure$axios_0.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', json([to('chat_id', tmp$_0.chat.id), to('text', CalculatorKeyboard$Companion_getInstance().DEFAULT_INPUT), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())])).then(main$lambda$lambda$lambda(closure$instanceController_0, tmp$_0, res)).catch(main$lambda$lambda$lambda_0(res));
        '';
        tmp$_2 = tmp$_0;
      }
       else
        tmp$_2 = null;
      if (tmp$_2 == null) {
        if ((tmp$_1 = asCallbackQuery(body.callback_query)) != null) {
          var closure$instanceController_1 = closure$instanceController;
          var closure$axios_1 = closure$axios;
          var tmp$_3;
          println('callback received from ' + tmp$_1.from.firstName + ', data ' + tmp$_1.data + ', message text ' + tmp$_1.message.text);
          if ((tmp$_3 = closure$instanceController_1.requestFromCallback_y5sqzh$(tmp$_1)) != null) {
            closure$axios_1.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/editMessageText', tmp$_3).then(main$lambda$lambda$lambda$lambda(res)).catch(main$lambda$lambda$lambda$lambda_0(res));
          }
        }
      }
      return res.end('ok');
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
    this.processor_0 = new Processor();
  }
  Instance.prototype.process_61zpoe$ = function (input) {
    return this.processor_0.process_61zpoe$(input);
  };
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
  InstanceController.prototype.requestFromCallback_y5sqzh$ = function (callbackQuery) {
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
    var $receiver_0 = ensureNotNull(firstOrNull$result);
    return (tmp$ = $receiver_0.messageId === callbackQuery.message.id ? $receiver_0 : null) != null ? json([to('chat_id', tmp$.chat.id), to('message_id', tmp$.messageId), to('text', tmp$.process_61zpoe$(removePrefix(callbackQuery.data, 'data'))), to('reply_markup', (new CalculatorKeyboard(5, 3)).toJson())]) : null;
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
    var tmp$, tmp$_0;
    var tmp$_1;
    if (this.action_0 != null) {
      this.secondValue_0 += input;
      return this.secondValue_0;
    }
     else
      tmp$_1 = null;
    var tmp$_2;
    if ((tmp$_0 = tmp$_1) != null)
      tmp$_2 = tmp$_0;
    else {
      var tmp$_3;
      var $receiver = CalculatorAction$values();
      var firstOrNull$result;
      firstOrNull$break: do {
        var tmp$_4;
        for (tmp$_4 = 0; tmp$_4 !== $receiver.length; ++tmp$_4) {
          var element = $receiver[tmp$_4];
          if (equals(element.title, input)) {
            firstOrNull$result = element;
            break firstOrNull$break;
          }
        }
        firstOrNull$result = null;
      }
       while (false);
      if ((tmp$ = firstOrNull$result) != null) {
        this.action_0 = tmp$;
        return this.calculate_0();
      }
       else
        tmp$_3 = null;
      tmp$_2 = tmp$_3;
    }
    if (tmp$_2 == null) {
      this.firstValue_0 += input;
      return this.firstValue_0;
    }
  };
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  Processor.prototype.calculate_0 = function () {
    var value = this.action_0;
    var requireNotNull$result;
    if (value == null) {
      var message = 'Required value was null.';
      throw IllegalArgumentException_init(message.toString());
    }
     else {
      requireNotNull$result = value;
    }
    return requireNotNull$result.calculate_puj7f4$(this.firstValue_0, this.secondValue_0);
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
  Object.defineProperty(CalculatorKeyboard, 'Companion', {
    get: CalculatorKeyboard$Companion_getInstance
  });
  _.CalculatorKeyboard = CalculatorKeyboard;
  Object.defineProperty(CalculatorAction, 'RESET', {
    get: CalculatorAction$RESET_getInstance
  });
  Object.defineProperty(CalculatorAction, 'ADD', {
    get: CalculatorAction$ADD_getInstance
  });
  Object.defineProperty(CalculatorAction, 'SUB', {
    get: CalculatorAction$SUB_getInstance
  });
  _.CalculatorAction = CalculatorAction;
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
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
