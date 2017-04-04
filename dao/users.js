var bcrypt = require('bcrypt');
var User = require('../models/user');
var auth = require('../auth/auth');

var users = {

    getAll: function(req, res) {
        // let's load in the users key
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (key) {
            // let's see if this user is admin
            auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
                if (allow) {
                    User.find(function (err,users) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(users);
                        }
                    });
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                }
            });
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Credentials",
            });
        }
    },

    getOne: function(req, res) {
        var id = req.params.id;
        // let's load in the users key
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (key) {
            // let's see if this user is admin
            auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
                if (allow) {
                    User.findOne({ username: id }, function (err,user) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(user);
                        }
                    });
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                }
            });
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Credentials",
            });
        }
    },

    getInfo: function (req, res) {
        var token = req.headers['x-access-token'];
        var key = req.headers['x-key'];

        if (token || key) {
            try {
                var decoded = jwt.decode(token, config.jwtsecret);

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                // Authorize the user for access
                getUser(decoded.username ,function (dbUser,err) { /** The key would be the logged in user's username */
                    // this checks to make sure we get a user object
                    if (dbUser) {
                        res.status(200);
                        res.json(dbUser.username)
                        return;
                    } else {
                        /**
                         * No user with this name exists, respond back with a 401
                         *(this error could also mean there was a problem retrieving the user object from the db)
                         *
                         */
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid User"
                        });
                        return;
                    }
                }); // end getUser()

            } catch (err) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": "Token Error."
                });
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
            return;
        }
    },

    creat: function(req, res){
        var username = req.body.username || '';
        var password = req.body.password || '';
        console.log('u: ' + username);
        console.log('p: ' + password);
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        auth.getUser(username, function(dbUserObj,err) {
            if (dbUserObj) {
                res.status(409);
                res.json({
                    "status": 409,
                    "message": "User already exists"
                });
                return;
            }

            if (!dbUserObj) {
                auth.encryptPass(password, function (hash) {
                    var newuser = new User({
                        username: username,
                        password: hash,
                        role: 'user'
                    });
                    newuser.save(function (err, newuser) {
                        if (err) {
                            return console.error(err);
                        } else {
                            res.json(newuser.username);
                        }
                    });
                });
            }
        });
    },


    update: function(req, res) {
        var updateuser = req.body;
        var id = req.params.id;
        // let's load in the users key
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (key) {
            // let's see if this user is admin
            auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
                if (allow) {
                    User.findOneAndUpdate({username:id},updateuser, function (err,user) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(user);
                        }
                    });
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                }
            });
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Credentials",
            });
        }
    },

    delete: function(req, res) {
        var id = req.params.id;
        // let's load in the users key
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (key) {
            // let's see if this user is admin
            auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
                if (allow) {
                    User.remove({username:id}, function (err,user) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(true);
                        }
                    });
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                }
            });
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Credentials",
            });
        }
    }
};

module.exports = users;