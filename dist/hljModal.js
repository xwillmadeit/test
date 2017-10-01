/*! hljmodal - v1.0.0 - 2017-10-01
* Copyright (c) 2017 xwillmadeit <xwillmadeit@gmail.com>; Licensed MIT */


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.HljModal = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  className: 'fade-in-down'
};

var Modal = function () {
  function Modal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Modal);

    this.options = _extends({}, defaultOptions, options);
    this.modal = null;
    this.overlay = null;
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

      this.modal.addEventListener('transitionend', function () {
        _this.modal.parentNode.removeChild(_this.modal);
      });

      this.overlay.addEventListener('transitionend', function () {
        _this.overlay.parentNode.removeChild(_this.overlay);
      });
    }
  }]);

  return Modal;
}();

return Modal;

})));
