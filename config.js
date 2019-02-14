const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  baseurl: process.env.API_URL,
  port: process.env.PORT,
};
