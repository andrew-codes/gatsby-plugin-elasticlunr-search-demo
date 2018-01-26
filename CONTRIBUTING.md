# Contributing

# Requirements

You must have [node](https://nodejs.org/en/) v8 or greater and [npm](https://www.npmjs.com/) v5 or greater. You will also need [git](https://git-scm.com/) installed in order to clone the repo.

## Setup

1. Fork and clone repo
1. Run `npm install` to install project dependencies
1. Run `npm start validate` to validate your environment meets the above section requirements
1. Create a branch for your pull request

# Getting Started

You can run `npm start help` to get a list of available commands. However, if you are developing the site locally, then simply run `npm start` and navigate to [http://localhost:8000](http://localhost:8000) in your browser.

## Running Integration Tests

Run the site via `npm start` then, in a separate CLI window, run `npm start test/integration`.

# Publishing

Only the **latest version** of the site is published to [Github Pages](https://pages.github.com/). Because we do not allow publishing different docs to the same version, the act of publishing also implicitly includes bumping the version. Therefore, depending on what type of version bump, you are able to publish to gh-pages via `npm start publish/major`, `npm start publish/minor`, and `npm publish/patch`. To learn more about which type of version increment to use, see the [semantic version docs](http://semver.org/).
