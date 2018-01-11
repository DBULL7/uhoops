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
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ({

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(139);

var log = console.log;

$('#email-login').on('keydown', function () {
  var email = $('#email-login').val();
  var password = $('#password-login').val();
  if (email.length && password.length) {
    $('#login-btn').prop('disabled', false);
  } else {
    $('#login-btn').prop('disabled', true);
  }
});

$('#password-login').on('keydown', function () {
  var email = $('#email-login').val();
  var password = $('#password-login').val();
  if (email.length && password.length) {
    $('#login-btn').prop('disabled', false);
  } else {
    $('#login-btn').prop('disabled', true);
  }
});

$("#login-btn").click(function () {
  var email = $("#email-login").val();
  var password = $("#password-login").val();
  fetch('http://localhost:3000/api/v1/account/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    log('this is the data: ', data);
    if (data.message === 'Success') {
      window.location.href = '/home';
    } else if (data.message === 'Wrong Password.') {
      $("#email-login").removeClass('border-danger');
      $("#password-login").addClass('border-danger');
    } else {
      $("#email-login").addClass('border-danger');
    }
  }).catch(function (err) {
    log(err);
  });
});

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });