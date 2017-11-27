"use strict";

const db = require('../config/db');
const DataTypes = db.Sequelize;
const sequelize = db.sequelize;

const User = require('./User').schema;

exports.schema = sequelize.define(
    "document",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        description: DataTypes.TEXT,
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        tableName: "document",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);