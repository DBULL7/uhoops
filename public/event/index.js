!function(n){function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:o})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=39)}({39:function(n,t,e){"use strict";e(40);var o=console.log;$("#update").on("click",function(){var n=$("#eventID").text(),t=$("#name").val(),e=$("#cost").val(),r=$("#description").val(),c=$("#location").val(),i=$("#date").val();fetch("/api/v1/event",{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:n,name:t,cost:e,location:c,description:r,date:i})}).then(function(n){return n.json()}).then(function(n){n.message}).catch(function(n){return o("Error: ",n)})}),$("#delete").on("click",function(){var n=$("#eventID").text();fetch("/api/v1/event/"+n,{method:"DELETE",credentials:"include"}).then(function(n){return n.json()}).then(function(n){o(n)}).catch(function(n){return o("Error: ",n)})})},40:function(n,t){}});