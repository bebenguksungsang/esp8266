const moment = require("moment");
const Logger = require("../util/logger");
const uuid = require("uuid");
const service = require("../service")
const models =require('../model/history_model')
exports.consume = async (amqpChannel, message) => {
   const histories =await models.findOne().sort({ create_at: -1 })
   console.log(histories)
  const data = message.content.toString();
  console.log(data)
  const array = data.split("#");
  let total_volume_Last;
  if (array[2] > 0){
    total_volume_Last=parseFloat(array[2]).toFixed(2)/1000;
  }else{
    total_volume_Last=parseFloat(array[2]).toFixed(2)/1000+histories.total_volume_Last;
  }
  const history = {
    guid: uuid.v4(),
    guid_device: array[0],
    volume: parseFloat(array[1]).toFixed(2),
    total_volume: parseFloat(array[2]).toFixed(2),
    total_volume_ML: parseFloat(array[2]).toFixed(2),
    total_volume_L: parseFloat(array[3]).toFixed(2),
    total_volume_Last:total_volume_Last,
    volume_used:(parseFloat(array[0]).toFixed(2)/1000)+histories.total_volume_Last,
    timestamp: Math.round(new Date().getTime() / 1000).toString(),
    date: moment().format("DD-MM-YYYY"),
    time: moment().format("HH:mm:ss"),
    day: moment().format("HH"),
    mont: moment().format("MM"),
    year: moment().format("YYYY"),
    datetime: moment().format("DD-MM-YYYY hh:mm:ss"),
  };
  try {
    console.log(histories.total_volume_Last)
    service.sendToMobileApp(history)
    console.log(history)
  } catch (error) {
    Logger.info("Terjadi Kesalahan:" + error);
  }
};
