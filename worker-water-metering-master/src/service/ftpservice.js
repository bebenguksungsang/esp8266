const mqtt = require("mqtt");
const fs = require("fs");
const PATH = process.env.FILE_PROD;
const moment = require("moment");
const { file_data } = require("../util");
const logger = require("../util/logger");

const Save_Json = async (data) => {
  const every_hour = data.guid_device + "-" + moment().format("DD-MM-YYYY") + "-" + moment().format("HH") + ".json";
  const history = data.guid_device + "-" + moment().format("DD-MM-YYYY") + ".json";
  const last_data = data.guid_device + "-" + moment().format("DD-MM-YYYY") + "-last" + ".json";
  const every_month = data.guid_device + "-" + moment().format("MM-YYYY") + "-month" + ".json";
  const every_year = data.guid_device + "-" + moment().format("YYYY") + "-year" + ".json";
  try {
    if (fs.existsSync(PATH + every_hour) && fs.existsSync(PATH + history)) {
      let service = [0, 1, 2, 3, 4]
      for (let i = 0; i < service.length; i++) {
        if (service[i] == 0) {
          Update_File(every_hour, data);
        } else if (service[i] == 1) {
          Update_File(history, data);
        } else if (service[i] == 2) {
          Save_Last_Data(last_data, data);
        } else if (service[i] == 3) {
          Update_File(every_month, data);
        } else if (service[i] == 4) {
          Update_File(every_year, data);
        }
      }
    } else {
      Save_Last_Data(last_data, data);
      let service = [0, 1, 2, 3, 4]
      for (let i = 0; i < service.length; i++) {
        if (service[i] == 0) {
          Create_New_File(every_hour, data);
        } else if (service[i] == 1) {
          Create_New_File(history, data);
        } else if (service[i] == 2) {
          Save_Last_Data(last_data, data);
        } else if (service[i] == 3) {
          Create_New_File(every_month, data);
        } else if (service[i] == 4) {
          Create_New_File(every_year, data);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const Create_New_File = async (data) => {
  try {
    fs.writeFile(
      PATH + data,
      JSON.stringify(file_data.json),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File...");
          return console.log(err);
        }
        logger.info("JSON file has been saved New data...");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const Update_File = async (data, sensor) => {
  let jsonData = require(PATH + data);
  try {
    jsonData.data.push(sensor);
    Save_History(data, jsonData);
  } catch (error) {
    console.log(error);
  }
};

const Save_History = async (filename, data) => {
  try {
    fs.writeFile(PATH + filename, JSON.stringify(data), "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File...");
        return console.log(err);
      }
      logger.info("JSON file has been saved....");
    });
  } catch (error) {
    console.log(error);
  }
};

const Save_Last_Data = async (filename, data) => {
  let jsonContent = JSON.stringify(data);
  fs.writeFile(PATH + filename, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File....");
      return console.log(err);
    }
    logger.info("JSON file has been saved Last data.....");
  });
};

module.exports = {
  Save_Json,
};
