!function(e){function n(a){if(s[a])return s[a].exports;var o=s[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var s={};n.m=e,n.c=s,n.d=function(e,s,a){n.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(s,"a",s),s},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=38)}({38:function(e,n,s){"use strict";s(39);var a=console.log;$("#email-login").on("keydown",function(){var e=$("#email-login").val(),n=$("#password-login").val();e.length&&n.length?$("#login-btn").prop("disabled",!1):$("#login-btn").prop("disabled",!0)}),$("#password-login").on("keydown",function(){var e=$("#email-login").val(),n=$("#password-login").val();e.length&&n.length?$("#login-btn").prop("disabled",!1):$("#login-btn").prop("disabled",!0)}),$("#login-btn").click(function(){var e=$("#email-login").val(),n=$("#password-login").val();fetch("/api/v1/account/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:n})}).then(function(e){return e.json()}).then(function(e){a("this is the data: ",e),"Success"===e.message?window.location.href="/":"Wrong Password."===e.message?($("#email-login").removeClass("border-danger"),$("#password-login").addClass("border-danger")):$("#email-login").addClass("border-danger")}).catch(function(e){a(e)})}),$("#name, #email, #password, #confirmPassword").on("keypress keyup keydown focus blur",function(){o(),r();var e=$("#name").val(),n=$("#email").val();e.length&&n.length>3&&l()?$("#signup-btn").prop("disabled",!1):$("#signup-btn").prop("disabled",!0)});var o=function(){$("#name").val().length?$("#name").addClass("border-success"):$("#name").removeClass("border-success")},r=function(){$("#email").val().length>3?$("#email").addClass("border-success"):$("#email").removeClass("border-success")};$("#password").on("keypress keyup keydown focus blur",function(){var e=$("#password").val();e.length<8&&e.length>1?($("small").removeClass("text-muted"),$("small").addClass("text-warning")):e.length>7&&($("small").removeClass("text-warning"),$("small").addClass("text-success"))});var l=function(){var e=$("#password").val(),n=$("#confirmPassword").val();return e.length<8||n.length<8?($("#confirmPassword, #password").removeClass("border-success"),!1):e!==n?($("#confirmPassword, #password").addClass("border-danger"),!1):($("#confirmPassword, #password").removeClass("border-danger"),$("#confirmPassword, #password").addClass("border-success"),!0)};$("#signup-btn").click(function(){var e=$("#email").val(),n=$("#password").val(),s=$("#name").val();fetch("/api/v1/account",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:n,name:s})}).then(function(e){return e.json()}).then(function(e){a("this is the data: ",e),"Success"===e.message?window.location.href="/":"Email Taken."===e.message&&($("#email").removeClass("border-success"),$("#email").addClass("bg-danger"))}).catch(function(e){a(e)})})},39:function(e,n){}});