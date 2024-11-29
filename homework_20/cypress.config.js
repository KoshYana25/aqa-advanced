const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress", "fixtures", `${file}.json`);
  return fs.readJsonSync(pathToConfigFile);
}

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      const configFile = config.env.configFile || "qauto"; 
      const customConfig = getConfigurationByFile(configFile);

      
      return { ...config, ...customConfig };
    },
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://qauto.forstudy.space/", 
  },
};
