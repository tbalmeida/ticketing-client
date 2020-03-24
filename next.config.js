require("dotenv").config();

module.exports = {
  env: {
    PUBLISHABLE_KEY: process.env.development.PUBLISHABLE_KEY
  }
};
