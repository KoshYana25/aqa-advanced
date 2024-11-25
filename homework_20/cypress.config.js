const webpack = require("@cypress/webpack-preprocessor");

module.exports = {
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/', 
    specPattern: 'cypress/e2e/**/*.cy.js', 
    setupNodeEvents(on, config) {
      const options = webpack({
        webpackOptions: require("./webpack.config"),
        watchOptions: {},
      });

      on("file:preprocessor", options);
      return config;
    },
  },
};
