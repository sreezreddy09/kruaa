const {createLogger, format, transports } = require("winston");
const { combine, printf } = format;


const myFormat = printf((logEntry) => {	
	let SPLAT = logEntry[Symbol.for('splat')];
    let splat;
    if( SPLAT ){
        for(var k in SPLAT){
            if(typeof SPLAT[k] === 'object'){
                SPLAT[k] = JSON.stringify(SPLAT[k])
            }
        }
        splat = SPLAT.join(" ");
    }else{
        splat ="";
    }

    return  `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${logEntry.level}: ${logEntry.message} ${splat}`;
});


const logger = createLogger({
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

module.exports = logger;