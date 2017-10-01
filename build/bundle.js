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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modal_css__);



var btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
  var modal = new __WEBPACK_IMPORTED_MODULE_0__Modal__["a" /* default */]();
  modal.open();
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  closeBtn: true,
  className: 'fade-in-down'
};

function transitionEnd() {
  var el = document.createElement('div');

  var transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name];
    }
  }

  return false;
}

var Modal = function () {
  function Modal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Modal);

    this.options = _extends({}, defaultOptions, options);
    this.modal = null;
    this.overlay = null;
    this.transitionEnd = transitionEnd();
  }

  _createClass(Modal, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
  }, {
    key: 'createModal',
    value: function createModal() {
      var domFrag = document.createDocumentFragment();

      this.modal = document.createElement('div');
      this.modal.className += ' hlj-modal ' + this.options.className;

      this.overlay = document.createElement('div');
      this.overlay.className += ' hlj-overlay';

      domFrag.appendChild(this.modal);
      domFrag.appendChild(this.overlay);

      document.body.appendChild(domFrag);
    }
  }, {
    key: 'open',
    value: function open() {
      this.createModal();
      this.bindEvents();

      window.getComputedStyle(this.modal).height;
      this.modal.className += ' modal-open';
      this.overlay.className += ' modal-open';
    }
  }, {
    key: 'close',
    value: function close() {
      var _this = this;

      this.modal.className = this.modal.className.replace(' modal-open', '');
      this.overlay.className = this.overlay.className.replace(' modal-open', '');

      // ie <= 9
      if (!this.transitionEnd) {
        this.modal.parentNode.removeChild(this.modal);
        this.overlay.parentNode.removeChild(this.overlay);
      } else {
        this.modal.addEventListener(this.transitionEnd, function () {
          _this.modal.parentNode.removeChild(_this.modal);
        });

        this.overlay.addEventListener(this.transitionEnd, function () {
          _this.overlay.parentNode.removeChild(_this.overlay);
        });
      }
    }
  }]);

  return Modal;
}();

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);