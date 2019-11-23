/**
 * @description jest server
 * @author ainuo5213
 */


const request = require('supertest')
const server = require('../src/app').callback()
module.exports = request(server)
