const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  jwtsecret: process.env.JWTSECRET,
  port: process.env.PORT,
  hostname: process.env.HOSTNAME
};
