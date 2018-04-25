let Config = module.exports = {};

Config.username = process.env.DB_USERNAME || 'root';
Config.password = process.env.DB_PASSWORD || '123456';
Config.database = process.env.DB_DATABASE || 'location';
Config.host = process.env.DB_HOST || '127.0.0.1';
Config.port = process.env.DB_PORT || '5432';
Config.dialect = process.env.DB_DIALECT || 'postgres';
