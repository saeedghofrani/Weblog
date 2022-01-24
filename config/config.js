// config.js
require('dotenv').config();
const env = process.env.NODE_ENV;
const development = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'loginSession'
    },
    session: {
        sessionSecret: process.env.DEV_SESSION_SECRET || "How@You@Doing@regina@phalange@Joey@doesn’t@share@food!@"
    }
};
const config = {
    development
};
module.exports = config[env];