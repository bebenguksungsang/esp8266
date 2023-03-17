const logger = require("../util/logger");
const mqtt = require("mqtt");

const Mqtt_Publish = async (data) => {
  try {
    logger.info("Publish MQTT........");
    let client = mqtt.connect(process.env.MQTT_HOST, {
      username: process.env.MQTT_USER,
      password: process.env.RMQ_PASS,
      protocolId: "MQTT",
    });
    client.on("connect", function () {
      logger.info("Publish data to:" + data.guid_device);
      client.publish(
        data.guid_device,
        JSON.stringify({
          guid_device: data.guid_device,
          volume: data.volume,
          total_volume: data.total_volume,
          total_volume_ML: data.total_volume_ML,
          total_volume_L: data.total_volume_L,
          total_volume_Last: data.total_volume_Last,
          timestamp: data.timestamp,
          datetime: data.datetime,
        }),
        { qos: 1, retain: true }
      );
      logger.info("Publish data to:" + "website-" + data.guid_device);
      client.publish("website-" +
        data.guid_device,
        JSON.stringify({
          guid_device: data.guid_device,
          volume: data.volume,
          total_volume: data.total_volume,
          total_volume_ML: data.total_volume_ML,
          total_volume_L: data.total_volume_L,
          total_volume_Last: data.total_volume_Last,
          timestamp: data.timestamp,
          datetime: data.datetime,
        }),
        { qos: 1, retain: true }
      );
      client.end();
    });
  } catch (error) {
    logger.info("Terjadi Kesalahan" + error);
  }
};

module.exports = {
  Mqtt_Publish
}