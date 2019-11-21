"use strict";
/**
 * @description 连接redis数据库
 * @author ainuo5213
 * */
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var Redis = require('ioredis');
var redis = new Redis(db_1.REDIS_CONFIG);
exports.default = redis;
