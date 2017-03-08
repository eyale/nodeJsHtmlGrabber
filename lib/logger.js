const winston = require('winston');

winston.add(winston.transports.File, {fileName:'node-start.log'});
winston.remove(winston.transports.Console);

module.exports = winston;
