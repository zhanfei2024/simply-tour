const Config = module.exports = {};

Config.appkey = process.env.APP_KEY || '676a1fa306d156b6b7965042';
Config.masterSecret = process.env.MASTER_SECRET || 'eb79d05ab534bc9d19a28501';
// Config.isDebug = process.env.IS_DEBUG || false;   // 配置后，与logger 产生冲突
