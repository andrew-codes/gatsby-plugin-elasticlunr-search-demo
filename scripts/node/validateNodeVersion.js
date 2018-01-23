const {engines} = require('../../package.json');
const createVersionValidator = require('../createVersionValidator');

createVersionValidator('node')(engines.node, process.version);