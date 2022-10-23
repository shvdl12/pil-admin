var winston = require('winston');
require('winston-daily-rotate-file');

const logDir = __dirname + '/logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf,prettyPrint,splat } = winston.format;

// Define log format
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
  // return `${info.timestamp} [${info.level}] : ${JSON.stringify(info.message)}`;
});


// const logFormat = printf(({ timestamp, level, message, meta }) => {
//   return `${timestamp};${level};${message};${meta? JSON.stringify(meta) : ''}`;
// });

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
    prettyPrint(),
//    splat()
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new(winston.transports.DailyRotateFile)({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: '30d',  // 30일치 로그 파일 저장
      zippedArchive: true, 
      //json: true
    }),
    // error 레벨 로그를 저장할 파일 설정
    new(winston.transports.DailyRotateFile)({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
      filename: `%DATE%.error.log`,
      maxFiles: '30d',
      zippedArchive: true,
      //json: true
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),  // 색깔 넣어서 출력
      winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    )
  }));
}

module.exports = logger;