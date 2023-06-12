const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    
    viewportWidth: 640,
    viewportHeight: 1136,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});