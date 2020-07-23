/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/fast-text-encoding/text.min.js":
/*!******************************************************!*\
  !*** ../node_modules/fast-text-encoding/text.min.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(l){function m(){}function k(b,a){b=void 0===b?"utf-8":b;a=void 0===a?{fatal:!1}:a;if(-1==n.indexOf(b.toLowerCase()))throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+b+"') is invalid.");if(a.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");}if(l.TextEncoder&&l.TextDecoder)return!1;var n=["utf-8","utf8","unicode-1-1-utf-8"];Object.defineProperty(m.prototype,"encoding",{value:"utf-8"});m.prototype.encode=function(b,
a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to encode: the 'stream' option is unsupported.");a=0;for(var g=b.length,f=0,c=Math.max(32,g+(g>>1)+7),e=new Uint8Array(c>>3<<3);a<g;){var d=b.charCodeAt(a++);if(55296<=d&&56319>=d){if(a<g){var h=b.charCodeAt(a);56320===(h&64512)&&(++a,d=((d&1023)<<10)+(h&1023)+65536)}if(55296<=d&&56319>=d)continue}f+4>e.length&&(c+=8,c*=1+a/b.length*2,c=c>>3<<3,h=new Uint8Array(c),h.set(e),e=h);if(0===(d&4294967168))e[f++]=d;else{if(0===(d&4294965248))e[f++]=
d>>6&31|192;else if(0===(d&4294901760))e[f++]=d>>12&15|224,e[f++]=d>>6&63|128;else if(0===(d&4292870144))e[f++]=d>>18&7|240,e[f++]=d>>12&63|128,e[f++]=d>>6&63|128;else continue;e[f++]=d&63|128}}return e.slice?e.slice(0,f):e.subarray(0,f)};Object.defineProperty(k.prototype,"encoding",{value:"utf-8"});Object.defineProperty(k.prototype,"fatal",{value:!1});Object.defineProperty(k.prototype,"ignoreBOM",{value:!1});k.prototype.decode=function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to decode: the 'stream' option is unsupported.");
b.buffer instanceof ArrayBuffer&&(b=b.buffer);b=new Uint8Array(b);a=0;for(var g=[],f=[];;){var c=a<b.length;if(!c||a&65536){f.push(String.fromCharCode.apply(null,g));if(!c)return f.join("");g=[];b=b.subarray(a);a=0}c=b[a++];if(0===c)g.push(0);else if(0===(c&128))g.push(c);else if(192===(c&224)){var e=b[a++]&63;g.push((c&31)<<6|e)}else if(224===(c&240)){e=b[a++]&63;var d=b[a++]&63;g.push((c&31)<<12|e<<6|d)}else if(240===(c&248)){e=b[a++]&63;d=b[a++]&63;var h=b[a++]&63;c=(c&7)<<18|e<<12|d<<6|h;65535<
c&&(c-=65536,g.push(c>>>10&1023|55296),c=56320|c&1023);g.push(c)}}};l.TextEncoder=m;l.TextDecoder=k})("undefined"!==typeof window?window:"undefined"!==typeof global?global:this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../build/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/ws/browser.js":
/*!*************************************!*\
  !*** ../node_modules/ws/browser.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};


/***/ }),

/***/ "../src/client.js":
/*!************************!*\
  !*** ../src/client.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ./config */ "../src/config.js");

var event = __webpack_require__(/*! ./clientEvent */ "../src/clientEvent.js");

var stt = __webpack_require__(/*! ./stt */ "../src/stt.js");

var util = __webpack_require__(/*! ./util */ "../src/util.js");

var packet = __webpack_require__(/*! ./packet */ "../src/packet.js");

var messageEvent = __webpack_require__(/*! ./messageEvent */ "../src/messageEvent.js");

class Client {
  constructor(a, b) {
    this.roomId = a, this.ws = null, this.logger = null, this.heartbeatTask = null, this.messageEvent = messageEvent, this.ignore = [], this.options = this.setOptions(b || {}), this.clientEvent = {
      connect: {
        name: 'open',
        listener: event.open
      },
      disconnect: {
        name: 'close',
        listener: event.close
      },
      error: {
        name: 'error',
        listener: event.error
      }
    };
  }

  initSocket(a) {
    this.ws = new a(config.URL), this.ws.on('open', this.clientEvent.connect.listener.bind(this)), this.ws.on('error', this.clientEvent.error.listener.bind(this)), this.ws.on('close', this.clientEvent.disconnect.listener.bind(this)), this.ws.on('message', event.message.bind(this));
  }

  send(a) {
    this.ws.send(packet.Encode(stt.serialize(a)));
  }

  login() {
    this.send({
      type: 'loginreq',
      roomid: this.roomId
    });
  }

  joinGroup() {
    this.send({
      type: 'joingroup',
      rid: this.roomId,
      gid: 0
    });
  }

  heartbeat() {
    this.heartbeatTask = setInterval(() => {
      this.send({
        type: 'mrkl'
      });
    }, config.HEARBEAT_INTERVAL * 1e3);
  }

  logout() {
    this.send({
      type: 'logout'
    }), clearInterval(this.heartbeatTask);
  }

  run(a, b) {
    var c = a || __webpack_require__(/*! ./websocket */ "../src/websocket.js");

    var d = b || __webpack_require__(/*! ./logger */ "../src/logger.js");

    this.logger = new d(), this.initSocket(c);
  }

  setIgnore(a, b) {
    if (util.isObject(a)) for (var c in a) a[c] && this.ignore.push(c);else b && this.ignore.push(a);
    return this;
  }

  setOptions(a) {
    var b = {
      debug: false,
      logfile: "".concat(this.roomId, ".log")
    };
    var c = {};
    return util.isObject(a) ? (a.hasOwnProperty('debug') && util.isBoolean(a.debug) && (c.debug = a.debug), a.hasOwnProperty('logfile') && util.isString(a.logfile) && (c.logfile = a.logfile), Object.assign(b, c)) : b;
  }

  messageHandle(a) {
    packet.Decode(a, a => {
      var b = stt.deserialize(a);
      this.options.debug && (this.logger.init(util.isBrowser() ? this.roomId : this.options.logfile), this.logger.echo(b)), Object.keys(this.messageEvent).filter(a => !this.ignore.includes(a)).includes(b.type) && this.messageEvent[b.type](b);
    });
  }

  on(a, b) {
    var c = Object.keys(this.clientEvent).find(b => b === a.toLocaleLowerCase());

    if (c) {
      //在创建连接是触发connect事件时，发送登入，加入组，监听心跳消息
      if (c === 'connect') {
        var e = b;

        b = function (a) {
          this.login(), this.joinGroup(), this.heartbeat(), e.bind(this)(a);
        };
      }

      this.clientEvent[a].listener = b.bind(this);
    }

    var d = Object.keys(this.messageEvent).find(b => b === a.toLocaleLowerCase());
    d && (this.messageEvent[a] = b.bind(this));
  }

}

module.exports = Client;

/***/ }),

/***/ "../src/clientEvent.js":
/*!*****************************!*\
  !*** ../src/clientEvent.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function open() {
  //登入
  //加入组
  this.login(), this.joinGroup(), this.heartbeat();
}

function error(a) {
  console.error(a);
}

function close() {
  this.logout();
}

function message(a) {
  if (typeof MessageEvent !== 'undefined') {
    //无MessageEvent类型判断为node环境，转换数据为arraybuffer类型
    var b = new FileReader();
    b.onload = a => this.messageHandle(a.target.result), b.readAsArrayBuffer(a.data);
  } else this.messageHandle(a);
}

module.exports = {
  open,
  error,
  close,
  message
};

/***/ }),

/***/ "../src/config.js":
/*!************************!*\
  !*** ../src/config.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "../src/util.js"); //目前已知的弹幕服务器


var port = 8500 + util.random(1, 6);
var URL = "wss://danmuproxy.douyu.com:".concat(port, "/");
var HEARBEAT_INTERVAL = 45;
var MSG_LIVE_ON = '主播正在直播';
var MSG_LIVE_OFF = '主播没有直播';
var MSG_ROOM_RSS = '房间开播提醒';
var MSG_BC_BUY_DESERVE = '赠送酬勤通知';
var MSG_SSD = '超级弹幕';
var MSG_ROOM_SPBC = '房间内礼物广播';
module.exports = {
  URL,
  HEARBEAT_INTERVAL: 45,
  MSG_LIVE_ON: "\u4E3B\u64AD\u6B63\u5728\u76F4\u64AD",
  MSG_LIVE_OFF: "\u4E3B\u64AD\u6CA1\u6709\u76F4\u64AD",
  MSG_ROOM_RSS: "\u623F\u95F4\u5F00\u64AD\u63D0\u9192",
  MSG_BC_BUY_DESERVE: "\u8D60\u9001\u916C\u52E4\u901A\u77E5",
  MSG_SSD: "\u8D85\u7EA7\u5F39\u5E55",
  MSG_ROOM_SPBC: "\u623F\u95F4\u5185\u793C\u7269\u5E7F\u64AD"
};

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var danmaku = __webpack_require__(/*! ./client */ "../src/client.js");

danmaku.stt = __webpack_require__(/*! ./stt */ "../src/stt.js"), danmaku.util = __webpack_require__(/*! ./util */ "../src/util.js"), danmaku.logger = __webpack_require__(/*! ./logger */ "../src/logger.js"), danmaku.Websocket = __webpack_require__(/*! ./websocket */ "../src/websocket.js"), danmaku.packet = __webpack_require__(/*! ./packet */ "../src/packet.js"), module.exports = danmaku;

/***/ }),

/***/ "../src/logger.js":
/*!************************!*\
  !*** ../src/logger.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(a, b, c, d, e, f, g) { try { var h = a[f](g); var i = h.value; } catch (a) { return void c(a); } h.done ? b(i) : Promise.resolve(i).then(d, e); }

function _asyncToGenerator(a) { return function () { var b = this, c = arguments; return new Promise(function (d, e) { function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); } function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); } var h = a.apply(b, c); f(undefined); }); }; }

var util = __webpack_require__(/*! ./util */ "../src/util.js");

class Logger {
  constructor() {
    this.name = 'unknown', this.inited = false, this.db = null, this.version = 2;
  }

  init(a) {
    if (!this.inited) {
      this.name = a;
      var b = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      this.DB = b.open('danmaku', this.version), this.DB.addEventListener('success', a => {
        console.log('连接数据库', event, a), this.db = a.target.result;
      }), this.DB.addEventListener('upgradeneeded', a => {
        console.log('升级数据库', event, a), this.db = a.target.result;
        var b = this.db.createObjectStore('douyu', {
          keyPath: 'id',
          autoIncrement: true
        });
        b.createIndex('idx_room_id', 'room_id', {
          unique: false
        });
      }), this.DB.addEventListener('error', a => {
        console.log('连接数据库出错 Error:', a);
      }), this.inited = true;
    }
  }

  echo(a) {
    if (this.db !== null) {
      var b = this.db.transaction('douyu', 'readwrite');
      var c = b.objectStore('douyu');
      c.add({
        room_id: this.name,
        timestamp: new Date().getTime(),
        frame: a
      });
    }
  }

  all(a) {
    if (this.db !== null) {
      var b = this.db.transaction('douyu', 'readonly');
      var c = b.objectStore('douyu');
      var d = a ? c.index('idx_room_id').getAll(a) : c.getAll();
      return new Promise(function (a, b) {
        d.addEventListener('success', function (b) {
          a(b.target.result);
        }), d.addEventListener('error', function () {
          b(false);
        });
      });
    }
  }

  count(a) {
    if (this.db !== null) {
      var b = this.db.transaction('douyu', 'readonly');
      var c = b.objectStore('douyu');
      var d = a ? c.index('idx_room_id').count(a) : c.count();
      return new Promise(function (a, b) {
        d.addEventListener('success', function () {
          a(d.result);
        }), d.addEventListener('error', function () {
          b(false);
        });
      });
    }
  }

  export(a) {
    var b = this;
    return _asyncToGenerator(function* () {
      if (b.db !== null) {
        var c = yield b.all(a);
        var d = c.reduce((c, d) => {
          var e = {
            timestamp: d.timestamp,
            frame: d.frame
          };
          return a || (e.roomId = b.name), c.push(JSON.stringify(e)), c;
        }, []);
        return util.download(b.name, d.join('\n')), d;
      }
    })();
  }

  clear(a) {
    if (this.db !== null) {
      var b = this.db.transaction('douyu', 'readwrite');
      var c = b.objectStore('douyu');

      if (a) {
        var d = c.index('idx_room_id');
        var e = d.openCursor(IDBKeyRange.only(a));
        e.addEventListener('success', function () {
          var a = e.result;
          a && (a.delete(), a.continue());
        });
      } else c.clear();
    }
  }

}

module.exports = util.isBrowser() ? Logger : __webpack_require__(/*! ./loggerNode */ "../src/loggerNode.js");

/***/ }),

/***/ "../src/loggerNode.js":
/*!****************************!*\
  !*** ../src/loggerNode.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(a, b, c, d, e, f, g) { try { var h = a[f](g); var i = h.value; } catch (a) { return void c(a); } h.done ? b(i) : Promise.resolve(i).then(d, e); }

function _asyncToGenerator(a) { return function () { var b = this, c = arguments; return new Promise(function (d, e) { function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); } function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); } var h = a.apply(b, c); f(undefined); }); }; }

var fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");

module.exports = class {
  constructor() {
    this.name = 'unknown', this.inited = false;
  }

  init(a) {
    this.inited || (this.name = a, this.inited = true);
  }

  echo(a) {
    var b = "".concat(JSON.stringify({
      timestamp: new Date().getTime(),
      frame: a
    }), "\n");
    fs.appendFile(this.name, b, function (a) {
      a && console.error('日志保存出错, Error:', a);
    });
  }

  all() {
    return new Promise((a, b) => {
      fs.readFile(this.name, 'utf8', function (c, d) {
        c ? b(c) : a(d);
      });
    });
  }

  count() {
    var a = this;
    return new Promise( /*#__PURE__*/function () {
      var b = _asyncToGenerator(function* (b) {
        var c = yield a.all();
        b(c.split('\n').filter(a => a !== '').length);
      });

      return function () {
        return b.apply(this, arguments);
      };
    }());
  }

  export() {
    return fs.readFileSync(this.name, 'utf8');
  }

  clear() {
    try {
      return fs.writeFileSync(this.name, '', 'utf8');
    } catch (a) {
      return false;
    }
  }

};

/***/ }),

/***/ "../src/messageEvent.js":
/*!******************************!*\
  !*** ../src/messageEvent.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ./config */ "../src/config.js");

module.exports = {
  loginres: function loginres() {// 登录响应
    // 服务端返回登录响应消息,完整的数据部分应包含的字段如下:
    // 字段说明
    //     type             表示为“登录”消息,固定为 loginres
    //     userid           用户 ID
    //     roomgroup        房间权限组
    //     pg               平台权限组
    //     sessionid        会话 ID
    //     username         用户名
    //     nickname         用户昵称
    //     is_signed        是否已在房间签到
    //     signed_count     日总签到次数
    //     live_stat        直播状态
    //     npv              是否需要手机验证
    //     best_dlev        最高酬勤等级
    //     cur_lev          酬勤等级
  },
  chatmsg: function chatmsg(a) {
    // 弹幕消息
    // 用户在房间发送弹幕时,服务端发此消息给客户端,完整的数据部分应包含的字 段如下:
    // 字段说明
    //     type             表示为“弹幕”消息,固定为 chatmsg
    //     gid              弹幕组 id
    //     rid              房间 id
    //     uid              发送者 uid
    //     nn               发送者昵称
    //     txt              弹幕文本内容
    //     cid              弹幕唯一 ID
    //     level            用户等级
    //     gt               礼物头衔:默认值 0(表示没有头衔)
    //     col              颜色:默认值 0(表示默认颜色弹幕)
    //     ct               客户端类型:默认值 0(表示 web 用户)
    //     rg               房间权限组:默认值 1(表示普通权限用户)
    //     pg               平台权限组:默认值 1(表示普通权限用户)
    //     dlv              酬勤等级:默认值 0(表示没有酬勤)
    //     dc               酬勤数量:默认值 0(表示没有酬勤数量)
    //     bdlv             最高酬勤等级:默认值 0(表示全站都没有酬勤)
    console.log("<lv %s> [%s]  %s", a.level + (a.level < 10 ? ' ' : ''), a.nn, a.txt);
  },
  uenter: function uenter(a) {
    // 进入直播间
    // 具有特殊属性的用户进入直播间时,服务端发送此消息至客户端。完整的数据部 分应包含的字段如下:
    // 字段说明
    //     type   表示为“用户进房通知”消息,固定为 uenter
    //     rid    房间 ID
    //     gid    弹幕分组 ID
    //     uid    用户 ID
    //     nn     用户昵称
    //     str    战斗力
    //     level  新用户等级
    //     gt     礼物头衔:默认值 0(表示没有头衔)
    //     rg     房间权限组:默认值 1(表示普通权限用户)
    //     pg     平台身份组:默认值 1(表示普通权限用户)
    //     dlv    酬勤等级:默认值 0(表示没有酬勤)
    //     dc     酬勤数量:默认值 0(表示没有酬勤数量)
    //     bdlv   最高酬勤等级:默认值 0(表示全站都没有酬勤)
    console.log("\u6B22\u8FCE<lv ".concat(a.level, ">").concat(a.nn, "\u8FDB\u5165\u4E86\u76F4\u64AD\u95F4"));
  },
  upgrade: function upgrade() {// 用户等级提升
  },
  rss: function rss(a) {
    // 房间开播提醒
    // 房间开播提醒主要部分应包含的字段如下:
    // 字段说明
    //     type    表示为“房间开播提醒”消息,固定为 rss
    //     rid     房间 id
    //     gid     弹幕分组 id
    //     ss      直播状态,1-正在直播, 2-没有直播
    //     code    类型
    //     rt      开关播原因:0-主播开关播,其他值-其他原因
    //     notify  通知类型
    //     endtime 关播时间(仅关播时有效)
    console.log('[开播提醒]', a.ss == 1 ? config.MSG_LIVE_ON : config.MSG_LIVE_OFF);
  },
  bc_buy_deserve: function bc_buy_deserve() {// 赠送酬勤通知
    // 用户赠送酬勤时,服务端发送此消息至客户端。完整的数据部分应包含的字段如 下:
    // 字段说明
    //     type   表示为“赠送酬勤通知”消息,固定为 bc_buy_deserve
    //     rid    房间 ID
    //     gid    弹幕分组 ID
    //     level  用户等级
    //     cnt    赠送数量
    //     hits   赠送连击次数
    //     lev    酬勤等级
    //     sui    用户信息序列化字符串,详见下文。注意,此处为嵌套序列化,需注 意符号的转义变换。(转义符号参见 2.2 序列化)
  },
  ssd: function ssd() {// 超级弹幕
    // 超级弹幕主要部分应包含的字段如下:
    // 字段说明
    //     type     表示为“超级弹幕”消息,固定为 ssd
    //     rid      房间 id
    //     gid      弹幕分组 id
    //     sdid     超级弹幕 id
    //     trid     跳转房间 id
    //     content  超级弹幕的内容
  },
  spbc: function spbc(a) {
    // 房间内礼物广播
    // 房间内赠送礼物成功后效果主要部分应包含的字段如下:
    //  字段说明
    //     type   表示为“房间内礼物广播”,固定为 spbc
    //     rid    房间 id
    //     gid    弹幕分组 id
    //     sn     赠送者昵称
    //     dn     受赠者昵称
    //     gn     礼物名称
    //     gc     礼物数量
    //     drid   赠送房间
    //     gs     广播样式
    //     gb     是否有礼包(0-无礼包,1-有礼包)
    //     es     广播展现样式(1-火箭,2-飞机)
    //     gfid   礼物 id
    //     eid    特效 id
    console.log("------------- \u611F\u8C22[".concat(a.sn, "] \u8D60\u9001\u7684 ").concat(a.gn, "x").concat(a.gc));
  },
  dgb: function dgb() {// 赠送礼物
    // 用户在房间赠送礼物时,服务端发送此消息给客户端。完整的数据部分应包含的 字段如下:
    // 字段说明
    //     type   表示为“赠送礼物”消息,固定为 dgb
    //     rid    房间 ID
    //     gid    弹幕分组 ID
    //     gfid   礼物 id
    //     gs     礼物显示样式
    //     uid    用户 id
    //     nn     用户昵称
    //     str    用户战斗力
    //     level  用户等级
    //     dw     主播体重
    //     gfcnt  礼物个数:默认值 1(表示 1 个礼物)
    //     hits   礼物连击次数:默认值 1(表示 1 连击)
    //     dlv    酬勤头衔:默认值 0(表示没有酬勤)
    //     dc     酬勤个数:默认值 0(表示没有酬勤数量)
    //     bdl    全站最高酬勤等级:默认值 0(表示全站都没有酬勤)
    //     rg     房间身份组:默认值 1(表示普通权限用户)
    //     pg     平台身份组:默认值 1(表示普通权限用户)
    //     rpid   红包 id:默认值 0(表示没有红包)
    //     slt    红包开启剩余时间:默认值 0(表示没有红包)
    //     elt    红包销毁剩余时间:默认值 0(表示没有红包)
  },
  onlinegift: function onlinegift(a) {
    // 领取在线鱼丸
    // 在线领取鱼丸时,若出现暴击(鱼丸数大于等于 60)服务则发送领取暴击消息 到客户端。完整的数据部分应包含的字段如下:
    // 字段说明
    //     type             表示为“领取在线鱼丸”消息,固定为 onlinegift
    //     rid              房间 ID
    //     uid              用户 ID
    //     gid              弹幕分组 ID
    //     sil              鱼丸数
    //     if               领取鱼丸的等级
    //     ct               客户端类型标识
    //     nn               用户昵称
    console.log("------------- [".concat(a.nn, "] \u9886\u53D6\u9C7C\u4E38x").concat(a.sil));
  },
  ggbb: function ggbb() {// 房间用户抢红包
    // 房间赠送礼物成功后效果(赠送礼物效果,连击数)主要部分应包含的字段如下:
    // 字段说明
    //     type  表示“房间用户抢红包”信息,固定为 ggbb
    //     rid   房间 id
    //     gid   弹幕分组 id
    //     sl    抢到的鱼丸数量
    //     sid   礼包产生者 id
    //     did   抢礼包者 id
    //     snk   礼包产生者昵称
    //     dnk   抢礼包者昵称
    //     rpt   礼包类型
  },
  rankup: function rankup() {// 房间内top10变化消息
    // 房间内 top10 排行榜变化后,广播。主要部分应包含的字段如下:
    // 字段说明
    // type  表示为“房间 top10 排行榜变换”,固定为 rankup
    // rid   房间 id
    // gid   弹幕分组 id
    // uid   用户 id
    // drid  目标房间 id
    // rt    房间所属栏目类型
    // bt    广播类型:1-房间内广播,2-栏目广播,4-全站广播
    // sz    展示区域:1-聊天区展示,2-flash 展示,3-都显示
    // nk    用户昵称
    // rkt   top10 榜的类型 1-周榜 2-总榜 4-日榜
    // rn    上升后的排名
  },
  ranklist: function ranklist() {// 广播排行榜消息
  },
  mrkl: function mrkl() {// 心跳
  },
  erquizisn: function erquizisn() {// 鱼丸预言，参数未知
  },
  blab: function blab() {// 粉丝等级升级
    // 字段说明
    // type  表示为“粉丝等级升级”,固定为 blab
    // rid   房间 id
    // uid   用户 id
    // nn  用户昵称
    // bl  升级后的等级
    // bnn 升级的粉丝牌
    // lbl 未知（猜测未升级前的等级）
    // ba  未知
  },
  rri: function rri() {// 未知的消息事件
  },
  synexp: function synexp() {},
  noble_num_info: function noble_num_info() {// 未知的消息事件
  },
  gbroadcast: function gbroadcast() {// 未知的消息事件
  },
  qausrespond: function qausrespond() {// 未知的消息事件
  },
  wiru: function wiru() {// 未知的消息事件
  },
  wirt: function wirt() {// 未知的消息事件
  },
  mcspeacsite: function mcspeacsite() {// 未知的消息事件
  },
  rank_change: function rank_change() {// 未知的消息事件
  },
  srres: function srres() {// 未知的消息事件
  },
  anbc: function anbc() {// 未知的消息事件
  },
  frank: function frank() {// 粉丝排行榜变化
  }
};

/***/ }),

/***/ "../src/packet.js":
/*!************************!*\
  !*** ../src/packet.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! fast-text-encoding */ "../node_modules/fast-text-encoding/text.min.js");

var util = __webpack_require__(/*! ./util */ "../src/util.js");

class Packet {
  constructor() {
    this.HEADER_LEN_SIZE = 4, this.HEADER_LEN_TYPECODE = 2, this.HEADER_LEN_ENCRYPT = 1, this.HEADER_LEN_PLACEHOLDER = 1, this.HEADER_LEN_TOTAL = this.HEADER_LEN_SIZE * 2 + this.HEADER_LEN_TYPECODE + this.HEADER_LEN_ENCRYPT + this.HEADER_LEN_PLACEHOLDER, this.encoder = new TextEncoder(), this.decoder = new TextDecoder(), this.buffer = new ArrayBuffer(0), this.readLength = 0;
  }

  concat() {
    var a = [];

    for (var b = 0; b < arguments.length; b++) a[b] = arguments[b];

    return a.reduce(function (a, b) {
      var c = b instanceof ArrayBuffer ? new Uint8Array(b) : b;
      var d = new Uint8Array(a.length + c.length);
      return d.set(a, 0), d.set(c, a.length), d;
    }, new Uint8Array(0));
  }

  Encode(a) {
    var b = this.concat(this.encoder.encode(a), Uint8Array.of(0));
    var c = b.length + this.HEADER_LEN_SIZE * 2;
    var d = b.length + this.HEADER_LEN_TOTAL;
    var e = new DataView(new ArrayBuffer(d));
    return e.setUint32(0, c, true), e.setUint32(4, c, true), e.setInt16(8, 689, true), e.setInt16(10, 0, true), (new Uint8Array(e.buffer).set(b, this.HEADER_LEN_TOTAL), e.buffer);
  }

  Decode(a, b) {
    for (this.buffer = this.concat(this.buffer, a).buffer; this.buffer && this.buffer.byteLength > 0;) {
      if (0 === this.readLength) {
        if (this.buffer.byteLength < 4) return;
        this.readLength = new DataView(this.buffer).getUint32(0, true), this.buffer = this.buffer.slice(4);
      }

      if (this.buffer.byteLength < this.readLength) return;
      var c = this.decoder.decode(this.buffer.slice(8, this.readLength - 1));
      this.buffer = this.buffer.slice(this.readLength), this.readLength = 0, b(c);
    }
  }
  /**
   * blob转arraybuffer
   * @param {Blob} blob 待转换的Blob类型参数
   */


  Blob2ab(a) {
    return new Promise(b => {
      var c = new FileReader();
      c.onload = function (a) {
        b(a.target.result);
      }, c.readAsArrayBuffer(a);
    });
  }
  /**
   * arraybuffer转blob
   * @param {ArrayBuffer} ab 待转换的ArrayBuffer类型参数
   */


  Ab2blob(a) {
    return new Blob([a]);
  }

}

module.exports = new Packet();

/***/ }),

/***/ "../src/stt.js":
/*!*********************!*\
  !*** ../src/stt.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "../src/util.js");

class STT {
  escape(a) {
    return util.isUndefined(a) ? '' : a.toString().replace(/@/g, '@A').replace(/\//g, '@S');
  }

  unescape(a) {
    return util.isUndefined(a) ? '' : a.toString().replace(/@A/g, '@').replace(/@S/g, '/');
  }

  serialize(a) {
    if (util.isObject(a)) return Object.keys(a).map(b => "".concat(b, "@=").concat(this.escape(this.serialize(a[b])), "/")).join('');
    return Array.isArray(a) ? a.map(a => "".concat(this.escape(this.serialize(a)), "/")).join('') : util.isString(a) || util.isNumber(a) ? a.toString() : void 0;
  }

  deserialize(a) {
    return a.includes('//') ? a.split('//').filter(a => a !== '').map(a => this.deserialize(a)) : a.includes('@=') ? a.split('/').filter(a => a !== '').reduce((a, b) => {
      var [c, d] = b.split('@=');
      return a[c] = this.deserialize(this.unescape(d)), a;
    }, {}) : a.includes('@A=') ? this.deserialize(this.unescape(a)) : a.toString();
  }

}

module.exports = new STT();

/***/ }),

/***/ "../src/util.js":
/*!**********************!*\
  !*** ../src/util.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Util() {
  ['Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'Date', 'Undefined', 'Null', 'Symbol', 'Blob', 'ArrayBuffer'].forEach(a => {
    this["is".concat(a)] = b => Object.prototype.toString.call(b).slice(8, -1) === a;
  });
} //判断浏览器环境


//随机数生成
//web端下载文件
Util.prototype.isBrowser = () => typeof window !== 'undefined', Util.prototype.random = (a, b) => Math.floor(Math.random() * (b - a + 1) + a), Util.prototype.download = function (a, b) {
  if (this.isBrowser()) {
    var c = document.createElement('a');
    c.style.display = 'none';
    var d = new Blob([b]);
    c.download = "".concat(a, ".log"), c.href = URL.createObjectURL(d), document.body.appendChild(c), c.click(), URL.revokeObjectURL(d), document.body.removeChild(c);
  }
}, module.exports = new Util();

/***/ }),

/***/ "../src/websocket.js":
/*!***************************!*\
  !*** ../src/websocket.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "../src/util.js");

class websocket {
  constructor(a) {
    this.listener = {}, this.socket = new WebSocket(a);
  }

  send(a) {
    this.socket.send(a);
  }

  close(a, b) {
    this.socket.close(a, b);
  }

  on(a, b) {
    var c = ['open', 'error', 'close', 'message'].find(b => b === a.toLocaleLowerCase());
    c && (Object.keys(this.listener).includes(c) && this.socket.removeEventListener(c, this.listener[c]), this.listener[c] = b, this.socket.addEventListener(c, b));
  }

}

module.exports = util.isBrowser() ? websocket : __webpack_require__(/*! ws */ "../node_modules/ws/browser.js");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index */ "../src/index.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_index__WEBPACK_IMPORTED_MODULE_0__);



window.douyudanmaku = _src_index__WEBPACK_IMPORTED_MODULE_0___default.a, window.danmaku = _src_index__WEBPACK_IMPORTED_MODULE_0___default.a;

/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=douyudanmaku.js.map