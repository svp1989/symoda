"use strict";

let sequelize;
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "dev";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
