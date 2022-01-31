// Module dependencies.
const mongoose = require("mongoose");
// require config file
const config = require("../config/config.js");
//get database data from config
const { db: { host, port, name } } = config;
//connection string for mongoose
const connectionString = `mongodb://${host}:${port}/${name}`;

// let connectionString = "mongodb://127.0.0.1:27017/myapp";
// mongoose.connect(connectionString);

// conecting mongo database
mongoose.connect(connectionString)
    .catch(err => {
        if (err) {
            console.log(err); process.exit(1);
        }
    });
// give connection to variable
const db = mongoose.connection;

// database on error event
db.on('error', console.error.bind(console, 'MongoDB conne ction error:'));

// database on conect event
db.on('connected', () => console.log('MongoDB connected'));

// database on disconnected event
db.on('disconnected', () => mongoose.connect(connectionString)
    .catch(err => {
        if (err) {
            console.log(err); process.exit(1);
        }
    }));
module.exports = db;
