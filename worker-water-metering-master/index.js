const amqp = require("./src/config/rmq");
const consumer = require("./src");
const logger = require("./src/util/logger");
const mongo =require("./src/config/database")

async function main() {
  try {
    const connection = await amqp.connectToAmqp();
    await consumer.consume(connection);
    mongo.Connection();
    logger.info("Connected! Consuming ...");
  } catch (error) {
    logger.error(error);
  }
}

setTimeout(function () {
  main();
}, 1000);
