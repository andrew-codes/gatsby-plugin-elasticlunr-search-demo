const path = require('path');
const { concurrent, crossEnv, rimraf, series } = require(`nps-utils`);

const hiddenFromHelp = true;
const rootDir = path.resolve(__dirname);

module.exports = {
  scripts: {
    build: {
      description: `Build a static site for use in production.`,
      script: crossEnv(`NODE_ENV=production gatsby build`),
    },
    clean: {
      description: `Remove all build artifacts.`,
      script: concurrent.nps(`clean/cache`, `clean/public`, `clean/gh-pages`),
    },
    'clean/cache': {
      hiddenFromHelp,
      script: rimraf(path.join(rootDir, '.cache')),
    },
    'clean/gh-pages': {
      hiddenFromHelp,
      script: `rm -rf node_modules/gh-pages/.cache`,
    },
    'clean/public': {
      hiddenFromHelp,
      script: rimraf(path.join(rootDir, 'public')),
    },
    cypress: {
      description: `Open cypress`,
      script: 'cypress open',
    },
    default: series.nps(`clean/cache`, `dev`),
    dev: {
      description: `Run site on a dev server for local site development.`,
      script: crossEnv(`NODE_ENV=development gatsby develop`),
    },
    'publish/major': {
      description: `Publish a new major version.`,
      script: series(
        `nps validate`,
        `npm version major`,
        `nps publish/gh-pages`,
      ),
    },
    'publish/minor': {
      description: `Publish a new minor version.`,
      script: series(
        `nps validate`,
        `npm version minor`,
        `nps publish/gh-pages`,
      ),
    },
    'publish/patch': {
      description: `Publish a new patch version.`,
      script: series(
        `nps validate`,
        `npm version patch`,
        `nps publish/gh-pages`,
      ),
    },
    'publish/gh-pages': {
      hiddenFromHelp,
      script: series(
        `nps clean`,
        `nps build`,
        `gh-pages --version --dir public --silent --no-push`,
        `nps clean/public`,
      ),
    },
    test: {
      description: `Run integration tests via cypress.`,
      script: series('nps dev', 'nps cypress'),
    },
    'test/integration': {
      description: `Run integration tests via cypress.`,
      script: `cypress run --headed`,
    },
    validate: {
      description: `Ensure your environment is correctly configured before developing locally.`,
      script: concurrent.nps(`validate/node`, `validate/npm`),
    },
    'validate/node': {
      hiddenFromHelp,
      script: `node scripts/node/validateNodeVersion.js`,
    },
    'validate/npm': {
      hiddenFromHelp,
      script: `node scripts/node/validateNPMVersion.js`,
    },
  },
};
