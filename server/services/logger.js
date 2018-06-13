const {createLogger, format, transports } = require("winston");
const { combine, printf, colorize, splat, simple, prettyPrint } = format;

const util = require("util");

const myFormat = printf(info => {
	return `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${info.level}: ${info.message}`;
});


const wrapper = createLogger({
	format : combine(
		myFormat
	),
	transports : [
		new transports.Console({
			colorize : true
		}),
		new transports.File({
			level : 'info',
			filename :"./server/logs/info.log"
		}),

		new transports.File({
			level : 'error',
			filename : "./server/logs/error.log"
		})
	]
});

function convertArgs(v){

	var args = Array.prototype.slice.call(v);
    for(var k in args){
        if (typeof args[k] === "object"){
            // args[k] = JSON.stringify(args[k]);
            args[k] = util.inspect(args[k], false, null, false);
        }
    }
    var str = args.join(", ");
    return str;
}

const logger = {};

logger.info = (...arguments) => {	
	wrapper.log.apply(wrapper, ["info", convertArgs(arguments)]);
};

logger.error = (...arguments) => {
	wrapper.log.apply(wrapper, ["error", convertArgs(arguments)]);
};

module.exports = logger;