var fs = require('fs');
var Logger = exports.Logger = {};
var message;


Logger.info = function (msg) {
  message = new Date().toString() + " : " + msg + "\n";
  fs.appendFileSync('./Logs/info.txt', message.toString(), "UTF-8", { 'flags': 'a' })
};


Logger.error = function (msg) {
  message = new Date().toString() + " : " + msg + "\n";
  fs.appendFileSync('./Logs/error.txt', message.toString(), "UTF-8", { 'flags': 'a' })
};

