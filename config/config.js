/** Declare config values **/

// define config object
var config = {};

// mongodb connection
config.db = "mongodb://localhost/restapi";

// port
config.port = 3002;

// JWT salt/secret
config.jwtsecret = "xUspTR6giWEJ96LkDi9SBhChpB8PJUQl4wLOk6MJtmYJSb4XHdNUkNrXWFA9J81";


module.exports = config;