const semver = require('semver');

module.exports = subject => (desiredVersion, actualVersion) => {
    if (!actualVersion) {
        throw new Error(`No actual version value provided; looking for ${subject}@${desiredVersion}.`);
    }
    if (!semver.satisfies(actualVersion, desiredVersion)) {
        throw new Error(`Your version of ${subject} does not satisfy the requirements; looking for ${subject}@${desiredVersion} and provided version was ${actualVersion}.`);
    }
    return `👍 ${subject} version satisfied: ${actualVersion}`;
};