let Config = module.exports = {};

Config.baseUrl = `${process.env.BASEURL || 'http://localhost:4200'}/#`;
Config.sourceUrl = process.env.SOURCEURL || 'http://localhost:3000';
Config.apiPath = '/api/v1';


// system
Config.systemName = 'Anyone';
Config.systemEmail = 'no-reply@anyone.com';
Config.systemTeamName = 'Anyone Team';
Config.siteSupportEmail = 'support@anyone.com';
Config.cs = 'zhengfei@yoov.com';
Config.siteTitle = 'Anyone';

