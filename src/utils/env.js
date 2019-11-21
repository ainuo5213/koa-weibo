"use strict";
/**
 * @description 环境变量
 * @author ainuo5213
 * */
Object.defineProperty(exports, "__esModule", { value: true });
var ENV = process.env.NODE_ENV;
exports.default = {
    isDev: ENV === 'development',
    notDev: ENV !== 'development',
    isProduction: ENV === 'production',
    notProduction: ENV !== 'production'
};
