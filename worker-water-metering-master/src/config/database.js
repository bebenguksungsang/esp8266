const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Logger = require("../util/logger");
const mongoURL = process.env.MONGO_DEV;


const Connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(mongoURL);
    Logger.info("Connection Database Successful...");
  } catch (error) {
    Logger.error("Connection Database Error " + error);
  }
};

module.exports = { Connection }