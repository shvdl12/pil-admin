const Sequelize = require("sequelize");
const logger = require("../logger")

logger.info(`DB Host: ${process.env.DB_HOST}`)
logger.info(`DB Port: ${process.env.DB_PORT}`)
logger.info(`DB Name: ${process.env.DB_NAME}`)
logger.info(`DB User: ${process.env.DB_USER}`)

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mariadb',
  logging: false,
  timezone: "+09:00",
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true
  }, 
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // dialectOptions: {
  //   options: {
  //     encrypt: false,
  //     validateBulkLoadParameters: false
  //   }, 
  // },
  define: {
    freezeTableName: true,
    timestamps: false,
  }
})

module.exports = sequelize