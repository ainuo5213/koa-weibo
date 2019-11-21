"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 存储配置，包括redis和mysql
 * @author ainuo5213
 */
var env_1 = require("../utils/env");
var redisConfig = {
    port: 6379,
    host: '127.0.0.1'
};
if (env_1.default.isProduction) {
    // TODO 生产环境的配置
}
exports.REDIS_CONFIG = redisConfig;
