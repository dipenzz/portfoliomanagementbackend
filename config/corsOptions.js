// cors - Cross Origin Resource Sharing
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    // origin property has two parameters
    // whereas the origin in the parameter is like the google.com
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // if the origin is in the whitelist
      callback(null, true); // pararmeter has  callback(error,boolean) so here error is null and origin will be sent back as true
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
