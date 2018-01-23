const {execSync} = require(`child_process`);
const createVersionValidator = require('../createVersionValidator');
const {engines} = require('../../package.json');

let npmVersion;
try {
    npmVersion = execSync(`npm --version`)
        .toString()
        .trim();
}
catch (error) {
    throw new Error('NPM not found.');
}

createVersionValidator('node')(engines.npm, npmVersion);