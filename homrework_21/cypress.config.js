const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://qauto.forstudy.space/",
    email: "yana12@gmail.com",
    password: "ValidPass1",
  },
});
