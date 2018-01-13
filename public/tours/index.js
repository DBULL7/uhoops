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
/******/ 	return __webpack_require__(__webpack_require__.s = 146);
/******/ })
/************************************************************************/
/******/ ({

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(147);

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
  fetch('/api/v1/account/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.message === 'Success') {
      location.reload();
    } else if (data.message === 'Email Taken.') {
      $('#email').removeClass('border-success');
      $("#email").addClass('bg-danger');
    }
  }).catch(function (err) {
    log(err);
  }).catch(function (err) {
    log(err);
  });
});

$('#name, #email, #password, #confirmPassword').on('keypress keyup keydown focus blur', function () {
  nameLength();
  emailLength();
  // compare()
  var name = $('#name').val();
  var email = $('#email').val();
  if (name.length && email.length > 3 && compare()) {
    $('#signup-btn').prop('disabled', false);
  } else {
    $('#signup-btn').prop('disabled', true);
  }
});

var nameLength = function nameLength() {
  var name = $('#name').val();
  if (name.length) {
    $('#name').addClass('border-success');
  } else {
    $('#name').removeClass('border-success');
  }
};

var emailLength = function emailLength() {
  var email = $('#email').val();
  if (email.length > 3) {
    $('#email').addClass('border-success');
  } else {
    $('#email').removeClass('border-success');
  }
};

$('#password').on('keypress keyup keydown focus blur', function () {
  var password = $('#password').val();
  // let confirmPassword = $('#confirmPassword').val() 
  if (password.length < 8 && password.length > 1) {
    $('small').removeClass('text-muted');
    $('small').addClass('text-warning');
  } else if (password.length > 7) {
    $('small').removeClass('text-warning');
    $('small').addClass('text-success');
  }
});

var compare = function compare() {
  var password = $('#password').val();
  var confirmPassword = $('#confirmPassword').val();
  if (password.length < 8 || confirmPassword.length < 8) {
    $('#confirmPassword, #password').removeClass('border-success');
    return false;
  }
  if (password !== confirmPassword) {
    $('#confirmPassword, #password').addClass('border-danger');
    return false;
  } else {
    $('#confirmPassword, #password').removeClass('border-danger');
    $('#confirmPassword, #password').addClass('border-success');
    return true;
  }
};

$("#signup-btn").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();
  var name = $('#name').val();
  fetch('/api/v1/account', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.message === 'Success') {
      window.location.href = '/tours';
    } else if (data.message === 'Email Taken.') {
      $('#email').removeClass('border-success');
      $("#email").addClass('bg-danger');
    }
  }).catch(function (err) {
    log(err);
  });
});

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });