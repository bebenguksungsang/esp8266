const models = require("../model/history_model");
const logger = require("../util/logger");

const Save_Log = async (data) => {
  try {
    logger.info("Simpan Log........");
    const log = await models.create(data);
    if (log) {
      logger.info("Berhasil Simpan Log...");
    } else {
      logger.info("Gagal Simpan Log...");
    }
  } catch (error) {
    logger.info("Terjadi Kesalahan" + error);
  }
}

module.exports = {
  Save_Log
}