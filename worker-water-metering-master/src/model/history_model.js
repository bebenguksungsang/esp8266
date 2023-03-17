const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      required: true,
      type: String,
    },
    guid_device: {
      type: String,
    },
    volume: {
      type: Number,
    },
    total_volume: {
      type: Number,
    },
    total_volume_ML: {
      type: Number,
    },
    total_volume_L: {
      type: Number,
    },
    total_volume_Last: {
      type: Number,
    },
    volume_used: {
      type: Number,
    },
    timestamp: {
      type: Number,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    datetime: {
      type: String,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("log", dataSchema);
