require("dotenv").config();
const amqp = require('amqplib')

const RMQ = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}/${process.env.RMQ_VHOST}?heartbeat=60`;
module.exports = {
  connectToAmqp: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let connection = await amqp.connect(RMQ);
        console.log(RMQ);
        resolve(connection);
      } catch (error) {
        console.log("Failed connect to AMQP: ", error);
        reject(error);
      }
    });
  },
};
