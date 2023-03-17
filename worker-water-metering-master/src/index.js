const Controller = require("./controller");
const logger = require("./util/logger");
require("dotenv").config();

exports.consume = async (connection) => {
  const channel = await connection.createChannel();
  channel.consume(process.env.QUE, async (msg) => {
    logger.info("Ada Data Baru....");
    await Controller.consume(channel, msg);
  },{noAck:true});
};
