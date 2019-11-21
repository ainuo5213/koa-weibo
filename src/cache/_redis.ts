/**
 * @description 连接redis数据库
 * @author ainuo5213
 * */


import {REDIS_CONFIG} from '../config/db'
const Redis = require('ioredis');

let redis = new Redis(REDIS_CONFIG);

export default redis
