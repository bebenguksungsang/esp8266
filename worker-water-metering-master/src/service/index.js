const mqtt_service = require("./mqttservice");
const mongo_service = require("./mongoservices");
const ftpservice = require("./ftpservice")

const sendToMobileApp = async (data) => {
  const data_sensor = JSON.stringify(data);
  let service = [0, 1, 2]
  for (let i = 0; i < service.length; i++) {
    if (service[i] == 0) {
      mqtt_service.Mqtt_Publish(data);
    } else if (service[i] == 1) {
      mongo_service.Save_Log(data);
    } else if (service[i] == 2) {
      ftpservice.Save_Json(data);
    }
  }
};

module.exports = {
  sendToMobileApp,
};
