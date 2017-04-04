var express = require('express');
var router = express.Router();

var auth = require('../auth/auth');
var beer = require('../dao/beers');
var user = require('../dao/users');


/*
 * Login, accessible by anyone, you can find the logic for login function in auth/validate.js
 */
router.post('/login', auth.login);

/*
 * Routes for beers
 */
router.get('/beers', beer.getAll);
router.get('/beer/:id', beer.getOne);
router.post('/beer/', beer.create);
router.put('/beer/:id', beer.update);
router.delete('/beer/:id', beer.delete);

/*
 * Routes for users
 *  -Only accessible by role admin.
 *  -The logic that controls that is located in the user data access object)
 */
router.get('/users', user.getAll, [require('../auth/validate')]);
router.get('/user/:id', user.getOne, [require('../auth/validate')]);
router.post('/user', user.creat);
router.put('/user/:id', user.update, [require('../auth/validate')]);
router.delete('/user/:id', user.delete, [require('../auth/validate')]);

module.exports = router;